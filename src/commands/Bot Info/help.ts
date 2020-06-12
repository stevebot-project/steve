/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Command, CommandStore, util, KlasaMessage } from 'klasa';
import { Message, TextChannel } from 'discord.js';
import { NAME } from '@root/config';
import { buildEmbed, floatPromise } from '@lib/util/util';
const has = (obj: any, key: any): any => Object.prototype.hasOwnProperty.call(obj, key);

export default class extends Command {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['commands', 'howthefuckdoiusethisbot'],
			guarded: true,
			description: `Shows info about ${NAME}'s commands.`,
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
			const DATA: any = msg.language.get('COMMAND_HELP_DATA');

			const embed = buildEmbed()
				.setTimestamp()
				.attachFiles(['./assets/images/steve_dab.png'])
				.setThumbnail('attachment://steve_dab.png')
				.setColor(0x71adcf)
				.setFooter(DATA.FOOTER(cmd.name))
				.setTitle(DATA.TITLE(util.isFunction(cmd.description) ? cmd.description(msg.language) : cmd.description))
				.setDescription([
					DATA.USAGE(cmd.usage.fullUsage(msg)),
					DATA.EXTENDED(util.isFunction(cmd.extendedHelp) ? cmd.extendedHelp(msg.language) : cmd.extendedHelp)
				].join('\n'));

			return msg.channel.send(embed);
		}

		if (msg.channel instanceof TextChannel) {
			const help = await this.buildHelp(msg);
			const categories = Object.keys(help);
			const helpMessage = ['You can do `s;help <command>` to get more info about a specific command!'];
			for (let cat = 0; cat < categories.length; cat++) {
				helpMessage.push(`**${categories[cat]} Commands**:`, '```asciidoc');
				const subCategories = Object.keys(help[categories[cat]]);
				for (let subCat = 0; subCat < subCategories.length; subCat++) helpMessage.push(`= ${subCategories[subCat]} =`, `${help[categories[cat]][subCategories[subCat]].join('\n')}\n`);
				helpMessage.push('```', '\u200b');
			}

			return msg.author.send(helpMessage, { split: { 'char': '\u200b' } })
				.then(() => { if (msg.channel.type !== 'dm') floatPromise(this, msg.sendLocale('COMMAND_HELP_DM')); })
				.catch(() => { if (msg.channel.type !== 'dm') floatPromise(this, msg.sendLocale('COMMAND_HELP_NODM')); });
		}
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	private async buildHelp(msg: KlasaMessage): Promise<{}> {
		const help = {};

		const prefix = msg.guildSettings.get('prefix');
		const commandNames = [...this.client.commands.keys()];
		const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

		await Promise.all(this.client.commands.map(cmd =>
			this.client.inhibitors.run(msg, cmd, true)
				.then(() => {
					if (!has(help, cmd.category)) help[cmd.category] = {};
					if (!has(help[cmd.category], cmd.subCategory)) help[cmd.category][cmd.subCategory] = [];
					const description = util.isFunction(cmd.description) ? cmd.description(msg.language) : cmd.description;
					help[cmd.category][cmd.subCategory].push(`${prefix}${cmd.name.padEnd(longest)} :: ${description}`);
				})
				.catch(() => {
					// noop
				})));

		return help;
	}

}
