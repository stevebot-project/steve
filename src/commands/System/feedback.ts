import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message, TextChannel } from 'discord.js';
import { FEEDBACK_GUILD, FEEDBACK_CHANNEL } from '@root/config';
import { newEmbed } from '@utils/util';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['suggest', 'makeyourbotworkbetter'],
			cooldown: 60,
			cooldownLevel: 'author',
			description: 'Send feedback or suggestions to the bot\'s developers.',
			helpUsage: '<your feedback>',
			usage: '<feedback:string{,1900}>'
		});
	}

	public run(msg: KlasaMessage, [feedback]: [string]): Promise<Message[]> {
		const feedbackGuild = this.client.guilds.cache.get(FEEDBACK_GUILD);
		if (!feedbackGuild) return;
		const feedbackChannel = feedbackGuild.channels.cache.get(FEEDBACK_CHANNEL) as TextChannel;
		if (!feedbackChannel) return;

		const embed = newEmbed()
			.addFields(
				{ name: 'Feedback', value: feedback }
			)
			.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
			.setTimestamp();

		return Promise.all([
			msg.channel.send('Your feedback has been sent, thanks!'),
			feedbackChannel.send(embed)
		]);
	}

	public async init(): Promise<void> {
		if (!FEEDBACK_GUILD || !FEEDBACK_CHANNEL) this.disable();
	}

}
