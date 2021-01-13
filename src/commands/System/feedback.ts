import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandOptions, KlasaMessage } from 'klasa';
import { Message, MessageEmbed, TextChannel } from 'discord.js';
import { FEEDBACK_GUILD, FEEDBACK_CHANNEL } from '@root/config';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<CommandOptions>({
	aliases: ['suggest', 'makeyourbotworkbetter'],
	cooldown: 60,
	cooldownLevel: 'author',
	description: lang => lang.tget('commandFeedbackDescription'),
	extendedHelp: lang => lang.tget('commandFeedbackExtended'),
	usage: '<feedback:string{,1900}>'
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage, [feedback]: [string]): Promise<Message[] | undefined> {
		const feedbackGuild = this.client.guilds.cache.get(FEEDBACK_GUILD);
		if (!feedbackGuild) throw msg.language.tget('commandFeedbackNoGuild');
		const feedbackChannel = feedbackGuild.channels.cache.get(FEEDBACK_CHANNEL) as TextChannel;
		if (!feedbackChannel) throw msg.language.tget('commandFeedbackNoChannel');

		const embed = new MessageEmbed()
			.addFields(
				{ name: 'Feedback', value: feedback }
			)
			.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
			.setTimestamp();

		return Promise.all([
			msg.channel.send(msg.language.tget('commandFeedbackSent')),
			feedbackChannel.send(embed)
		]);
	}

	public async init(): Promise<void> {
		if (!FEEDBACK_GUILD || !FEEDBACK_CHANNEL) this.disable();
	}

}
