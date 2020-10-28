import { Command, CommandStore, util, KlasaMessage } from 'klasa';
import { Collection, Message, TextChannel, MessageEmbed } from 'discord.js';
import { floatPromise } from '@lib/util/util';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';

function sortCommandsAlphabetically(_: Command[], __: Command[], firstCategory: string, secondCategory: string): 1 | -1 | 0 {
	if (firstCategory > secondCategory) return 1;
	if (secondCategory > firstCategory) return -1;
	return 0;
}

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['commands', 'howthefuckdoiusethisbot'],
			guarded: true,
			description: lang => lang.tget('COMMAND_HELP_DESCRIPTION'),
			usage: '(command:command)'
		});

		this
			.createCustomResolver('command', (str, possible, msg) => {
				if (!str || str === '') return null;

				return this.client.arguments.get('command').run(str, possible, msg);
			});
	}

	// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
	public async run(msg: KlasaMessage, [cmd]: [Command]): Promise<Message | void> {
		if (cmd) {
			const EMBED_DATA = msg.language.tget('COMMAND_HELP_DATA');

			const embed = new MessageEmbed()
				.setTimestamp()
				.attachFiles(['./assets/images/help_embed_thumbnail.png'])
				.setThumbnail('attachment://help_embed_thumbnail.png')
				.setColor(0x71adcf)
				.setFooter(EMBED_DATA.FOOTER(cmd.name))
				.setTitle(EMBED_DATA.TITLE(util.isFunction(cmd.description) ? cmd.description(msg.language) : cmd.description))
				.setDescription([
					EMBED_DATA.USAGE(cmd.usage.fullUsage(msg)),
					EMBED_DATA.EXTENDED(util.isFunction(cmd.extendedHelp) ? cmd.extendedHelp(msg.language) : cmd.extendedHelp)
				].join('\n'));

			return msg.channel.send(embed);
		}

		if (msg.channel instanceof TextChannel) {
			const prefix = msg.guildSettings.get(GuildSettings.Prefix);

			let help = await this.buildHelp(msg);
			help = `${msg.guild!.language.tget('COMMAND_HELP_BEGINNING', prefix)}\n\n${help}`;

			return msg.author.send(help, { split: { 'char': '\n' } })
				.then(() => { if (msg.channel.type !== 'dm') floatPromise(this, msg.sendLocale('COMMAND_HELP_DM')); })
				.catch(() => { if (msg.channel.type !== 'dm') floatPromise(this, msg.sendLocale('COMMAND_HELP_NODM')); });
		}
	}

	private async buildHelp(msg: KlasaMessage) {
		const commands = await this._fetchCommands(msg);
		const prefix = msg.guildSettings.get(GuildSettings.Prefix);

		const helpMessage: string[] = [];
		for (const [category, list] of commands) {
			helpMessage.push(`**${category} Commands**:\n`, list.map(this.formatCommand.bind(this, msg, prefix)).join('\n'), '');
		}

		return helpMessage.join('\n');
	}

	private formatCommand(message: KlasaMessage, prefix: string, command: Command) {
		const description = util.isFunction(command.description) ? command.description(message.language) : command.description;
		return `• **${prefix}${command.name}** ⇒ ${description}`;
	}

	private async _fetchCommands(message: KlasaMessage) {
		const run = this.client.inhibitors.run.bind(this.client.inhibitors, message);
		const commands = new Collection<string, Command[]>();
		await Promise.all(
			this.client.commands.map(cmd =>
				run(cmd, true)
					.then(() => {
						const category = commands.get(cmd.fullCategory.join(' ⇒ '));
						if (category) category.push(cmd);
						else commands.set(cmd.fullCategory.join(' ⇒ '), [cmd]);
						return null;
					})
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.catch(e => {
						// noop
					}))
		);

		return commands.sort(sortCommandsAlphabetically);
	}

}
