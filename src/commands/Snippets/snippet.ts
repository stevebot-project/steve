/* eslint-disable id-length */
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage, RichDisplay } from 'klasa';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Message, MessageEmbed } from 'discord.js';
import { buildEmbed } from '@utils/util';
import { chunk, codeBlock } from '@klasa/utils';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['snippets', 'snip', 'customcommand'],
			description: lang => lang.get('COMMAND_SNIPPET_DESCRIPTION'),
			extendedHelp: lang => lang.get('COMMAND_SNIPPET_EXTENDED'),
			runIn: ['text'],
			subcommands: true,
			usage: '<add|remove|list|edit|reset|source|view:default> (name:name{,100}) (content:content{,1900})'
		});

		this
			.createCustomResolver('name', (str, possible, msg, [action]) => action === 'list' ? null : str)
			.createCustomResolver('content', (str, possible, msg, [action]) => action === 'add' || action === 'edit' ? str : null);
	}

	public async add(msg: KlasaMessage, [snipName, snipContent]: [string, string]): Promise<Message> {
		if (!msg.member!.isStaff) throw msg.guild!.language.tget('COMMAND_SNIPPET_NOPERMISSION');

		const snips: Snippet[] = msg.guild!.settings.get(GuildSettings.Snippets);
		if (snips.some(snip => snip.name === snipName)) throw msg.guild!.language.tget('COMMAND_SNIPPET_ALREADYEXISTS', snipName);

		const newSnip = this.createSnip(msg, snipName, snipContent);
		await msg.guild!.settings.update(GuildSettings.Snippets, newSnip, { action: 'add' });

		return msg.channel.send(msg.guild!.language.tget('COMMAND_SNIPPET_ADD', newSnip.name));
	}

	public async edit(msg: KlasaMessage, [snipName, snipContent]: [string, string]): Promise<Message> {
		if (!msg.member!.isStaff) throw msg.guild!.language.tget('COMMAND_SNIPPET_NOPERMISSION');

		const snips: Snippet[] = msg.guild!.settings.get(GuildSettings.Snippets);
		const index = snips.findIndex(snip => snip.name === snipName);
		if (index === -1) throw msg.guild!.language.tget('COMMAND_SNIPPET_INVALID', snipName);

		await msg.guild!.settings.update(GuildSettings.Snippets, this.createSnip(msg, snipName, snipContent), { arrayPosition: index });

		return msg.channel.send(msg.guild!.language.tget('COMMAND_SNIPPET_EDIT', snipName));
	}

	public async remove(msg: KlasaMessage, [snipName]: [string]): Promise<Message> {
		if (!msg.member!.isStaff) throw msg.guild!.language.tget('COMMAND_SNIPPET_NOPERMISSION');

		const snips: Snippet[] = msg.guild!.settings.get(GuildSettings.Snippets);
		const snip = snips.find(snip => snip.name === snipName.toLowerCase());
		if (!snip) throw msg.guild!.language.tget('COMMAND_SNIPPET_INVALID', snipName);

		await msg.guild!.settings.update(GuildSettings.Snippets, snip, { action: 'remove' });

		return msg.channel.send(msg.guild!.language.tget('COMMAND_SNIPPET_REMOVE', snipName));
	}

	public async view(msg: KlasaMessage, [snipName]: [string]): Promise<Message> {
		const snips: Snippet[] = msg.guild!.settings.get(GuildSettings.Snippets);

		const snip = snips.find(s => s.name === snipName.toLowerCase());
		if (!snip) throw msg.guild!.language.tget('COMMAND_SNIPPET_INVALID', snipName);

		return msg.channel.send(snip.embed ? buildEmbed().setDescription(snip.content) : snip.content);
	}

	public async list(msg: KlasaMessage): Promise<Message> {
		const snips: Snippet[] = msg.guild!.settings.get(GuildSettings.Snippets);
		if (!snips.length) throw msg.guild!.language.tget('COMMAND_SNIPPET_NOSNIPS');

		const response = await msg.send(new MessageEmbed()
			.setDescription('Loading...'));

		const prefix = msg.guild!.settings.get(GuildSettings.Prefix);
		const display = new RichDisplay(new MessageEmbed());

		for (const page of chunk(snips, 30)) {
			const description = `\`${page.map(snip => `${prefix}${snip.name}`).join('`, `')}\``;
			display.addPage((embed: MessageEmbed) => embed.setDescription(description));
		}

		await display.run(response);
		return response;
	}

	public async reset(msg: KlasaMessage): Promise<Message> {
		if (!msg.member!.isStaff) throw msg.guild!.language.tget('COMMAND_SNIPPET_NOPERMISSION');

		await msg.guild!.settings.reset(GuildSettings.Snippets);

		return msg.channel.send(msg.guild!.language.tget('COMMAND_SNIPPET_RESET'));
	}

	public source(msg: KlasaMessage, [snipName]: string): Promise<Message> | null {
		const snips: Snippet[] = msg.guild!.settings.get(GuildSettings.Snippets);
		const snip = snips.find(s => s.name === snipName);
		return snip ? msg.channel.send(codeBlock('md', snip.content)) : null;
	}

	private createSnip(msg: KlasaMessage, name: string, content: string): Snippet {
		return {
			name: name.toLowerCase().replace(/ /g, '-'),
			content,
			embed: Reflect.has(msg.flagArgs, 'embed')
		};
	}

}

export interface Snippet {
	name: string;
	content: string;
	embed: boolean;
}
