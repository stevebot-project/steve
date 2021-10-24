import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandOptions, KlasaMessage } from 'klasa';
import { Message, MessageReaction } from 'discord.js';
import { ApplyOptions } from '@skyra/decorators';
import { floatPromise } from '@utils/util';

@ApplyOptions<CommandOptions>({
	aliases: ['vote'],
	description: lang => lang.tget('commandPollDescription'),
	extendedHelp: lang => lang.tget('commandPollExtended'),
	usage: '<duration:timespan> <name:string> <choices:string> [...]'
})

export default class extends SteveCommand {

	public async run(msg: KlasaMessage, [duration, name, ...choices]: [number, string, string]): Promise<Message> {
		if (choices.length < 2) return msg.channel.send(msg.language.tget('commandPollTooFew'));
		if (choices.length > 10) return msg.channel.send(msg.language.tget('commandPollTooMany'));

		// return msg.channel.send(`duration: ${duration}\nname: ${name}\nchoices: ${choices.join(', ')}`);

		const emotes = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'].slice(0, choices.length);

		let pollText = `**${name}**\n`;
		choices.forEach((choice, option) => {
			pollText += `${emotes[option]} ${choice}\n`;
		});

		const pollMsg = await msg.channel.send(pollText);

		emotes.forEach(emote => {
			floatPromise(this, pollMsg.react(emote));
		});

		return pollMsg.awaitReactions(
			(reaction: MessageReaction) => emotes.includes(reaction.emoji.name),
			{ time: duration }
		).then(reactions => {
			let maxVotes = 0;
			reactions.forEach(reaction => {
				if (reaction.users.cache.size > maxVotes) {
					maxVotes = reaction.users.cache.size;
				}
			});

			if (maxVotes <= 1) return pollMsg.reply(msg.language.tget('commandPollFail'));

			const winners = reactions
				.filter(reaction => reaction.users.cache.size >= maxVotes)
				.map(reaction => choices[emotes.indexOf(reaction.emoji.name)]);

			// Replies here are for when djs 13 switches this function to using inline replies
			floatPromise(this, pollMsg.edit(`${pollText}${msg.language.tget('commandPollEnd', winners, maxVotes - 1)}`));
			return pollMsg.reply(msg.language.tget('commandPollEnd', winners, maxVotes - 1));
		});
	}

}
