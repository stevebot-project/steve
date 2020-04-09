import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, util, KlasaMessage } from 'klasa';
import { Message, TextChannel } from 'discord.js';
import { NAME, CLIENT_OPTIONS } from '@root/config';
import { newEmbed } from '@lib/util/util';
import { Colors, Emojis } from '@lib/types/enums';
const has = (obj, key): any => Object.prototype.hasOwnProperty.call(obj, key); // eslint-disable-line @typescript-eslint/no-explicit-any

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['commands', 'howthefuckdoiusethisbot'],
			guarded: true,
			description: `Shows info about ${NAME}'s commands.`,
			examples: ['help', 'help roll'],
			usage: '(command:command)',
			helpUsage: 'command'
		});

		this
			.createCustomResolver('command', (str, possible, msg) => {
				if (!str || str === '') return null;

				return this.client.arguments.get('command').run(str, possible, msg);
			});
	}

	public async run(msg: KlasaMessage, [cmd]: [SteveCommand]): Promise<Message | void> {
		if (cmd) {
			const examples: string[] | string = cmd.examples ? cmd.examples : 'No examples provided.';
			const helpUsage = [];

			cmd.helpUsage // eslint-disable-line no-unused-expressions
				? helpUsage.push(`• ${CLIENT_OPTIONS.prefix}${cmd.name} ${cmd.helpUsage}`)
				: helpUsage.push(`• ${CLIENT_OPTIONS.prefix}${cmd.name}`);

			if (cmd.aliases.length) {
				for (const alias of cmd.aliases) {
					cmd.helpUsage // eslint-disable-line no-unused-expressions
						? helpUsage.push(`• ${CLIENT_OPTIONS.prefix}${alias} ${cmd.helpUsage}`)
						: helpUsage.push(`• ${CLIENT_OPTIONS.prefix}${alias}`);
				}
			}

			const description = util.isFunction(cmd.description) ? cmd.description(msg.language) : cmd.description || 'No description provided.';
			const extendedHelp = util.isFunction(cmd.extendedHelp) ? cmd.extendedHelp(msg.language) : cmd.extendedHelp || 'No extended help provided.';

			const embed = newEmbed()
				.setColor(Colors.SteveFireBlue)
				.setFooter(`Help for the ${cmd.name} command`)
				.setThumbnail(this.client.user.displayAvatarURL())
				.setTimestamp()
				.setTitle(description)
				.addFields(
					{ name: `${Emojis.SteveFaceLight} | *Usage*`, value: helpUsage.join('\n') },
					{ name: `${Emojis.StevePeace} | *Extended Help*`, value: extendedHelp }
				);

			if (Array.isArray(examples)) {
				const helpExamples = [];
				for (const example of examples) {
					helpExamples.push(`>> Steve, ${example}`);
				}

				embed.addFields({ name: `${Emojis.SteveFaceDark} | *Examples*`, value: helpExamples.join('\n') });
			}

			return msg.channel.send(embed);
		}

		if (msg.channel instanceof TextChannel) {
			const help = await this.buildHelp(msg);
			const categories = Object.keys(help);
			const helpMessage = ['You can do `s;help <command>` to get more info about a specific command!'];
			for (const category of categories) {
				helpMessage.push(`**${category} Commands**:`, '```asciidoc');
				const subcategories = Object.keys(help[category]);
				for (const subcategory of subcategories) helpMessage.push(`= ${subcategory} =`, `${help[category][subcategory].join('\n')}\n`);
				helpMessage.push('```', '\u200b');
			}

			return msg.author.send(helpMessage, { split: { 'char': '\u200b' } })
				.then(() => { if (msg.channel.type !== 'dm') return msg.sendLocale('COMMAND_HELP_DM'); })
				.catch(() => { if (msg.channel.type !== 'dm') return msg.sendLocale('COMMAND_HELP_NODM'); });
		}
	}

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
