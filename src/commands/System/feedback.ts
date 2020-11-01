import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message, MessageEmbed, TextChannel } from 'discord.js';
import { FEEDBACK_GUILD, FEEDBACK_CHANNEL } from '@root/config';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['suggest', 'makeyourbotworkbetter'],
			cooldown: 60,
			cooldownLevel: 'author',
			description: lang => lang.tget('COMMAND_FEEDBACK_DESCRIPTION'),
			extendedHelp: lang => lang.tget('COMMAND_FEEDBACK_EXTENDED'),
			usage: '<feedback:string{,1900}>'
		});
	}

	public async run(msg: KlasaMessage, [feedback]: [string]): Promise<Message[] | undefined> {
		const feedbackGuild = this.client.guilds.cache.get(FEEDBACK_GUILD);
		if (!feedbackGuild) throw msg.language.tget('COMMAND_FEEDBACK_NO_GUILD');
		const feedbackChannel = feedbackGuild.channels.cache.get(FEEDBACK_CHANNEL) as TextChannel;
		if (!feedbackChannel) throw msg.language.tget('COMMAND_FEEDBACK_NO_CHANNEL');

		const embed = new MessageEmbed()
			.addFields(
				{ name: 'Feedback', value: feedback }
			)
			.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
			.setTimestamp();

		return Promise.all([
			msg.channel.send(msg.language.tget('COMMAND_FEEDBACK_SENT')),
			feedbackChannel.send(embed)
		]);
	}

	public async init(): Promise<void> {
		if (!FEEDBACK_GUILD || !FEEDBACK_CHANNEL) this.disable();
	}

}
