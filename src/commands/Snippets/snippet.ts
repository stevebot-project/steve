/* eslint-disable id-length */
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Message } from 'discord.js';
import { buildEmbed } from '@utils/util';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['snippets', 'snip'],
			description: lang => lang.get('COMMAND_SNIPPET_DESCRIPTION'),
			extendedHelp: lang => lang.get('COMMAND_SNIPPET_EXTENDED'),
			runIn: ['text'],
			subcommands: true,
			usage: '<add|remove|list|edit|view:default> (name:name{,100}) (content:content{,1900})'
		});

		this
			.createCustomResolver('name', (str, possible, msg, [action]) => action === 'list' ? null : str)
			.createCustomResolver('content', (str, possible, msg, [action]) => action === 'add' || action === 'edit' ? str : null);
	}

	public async add(msg: KlasaMessage, [snipName, snipContent]: [string, string]): Promise<Message> {
		if (!msg.member!.isStaff) throw msg.language.get('COMMAND_SNIPPET_NOPERMISSION');

		const newSnip: Snippet = { name: snipName, content: snipContent, embed: Reflect.has(msg.flagArgs, 'embed') };
		const snips: Snippet[] = msg.guild!.settings.get(GuildSettings.Snippets);
		if (snips.filter(s => s.name === newSnip.name).length > 0) throw msg.language.get('COMMAND_SNIPPET_ALREADYEXISTS', snipName);

		await msg.guild!.settings.update(GuildSettings.Snippets, newSnip, { action: 'add' });

		return msg.channel.send(msg.language.get('COMMAND_SNIPPET_ADD', newSnip.name));
	}

	public async edit(msg: KlasaMessage, [snipName, snipContent]: [string, string]): Promise<Message> {
		if (!msg.member!.isStaff) throw msg.language.get('COMMAND_SNIPPET_NOPERMISSION');

		const snips: Snippet[] = msg.guild!.settings.get(GuildSettings.Snippets);
		const snipsClone = snips.slice();
		const index = snipsClone.map(s => s.name).indexOf(snipName);

		snipsClone[index].content = snipContent;
		await msg.guild!.settings.update(GuildSettings.Snippets, snipsClone, { action: 'overwrite' });

		return msg.channel.send(msg.language.get('COMMAND_SNIPPET_EDIT', snipName));
	}

	public async remove(msg: KlasaMessage, [snipName]: [string]): Promise<Message> {
		if (!msg.member!.isStaff) throw msg.language.get('COMMAND_SNIPPET_NOPERMISSION');

		const snips: Snippet[] = msg.guild!.settings.get(GuildSettings.Snippets);
		const snipsClone = snips.slice();
		const index = snipsClone.map(s => s.name).indexOf(snipName);

		snipsClone.splice(index, 1);
		await msg.guild!.settings.update(GuildSettings.Snippets, snipsClone, { action: 'overwrite' });

		return msg.channel.send(msg.language.get('COMMAND_SNIPPET_REMOVE', snipName));
	}

	public async view(msg: KlasaMessage, [snipName]: [string]): Promise<Message> {
		const snips: Snippet[] = msg.guild!.settings.get(GuildSettings.Snippets);
		if (snips.filter(s => s.name === snipName).length === 0) throw msg.language.get('COMMAND_SNIPPET_INVALID', snipName);

		const snip = snips.filter(s => s.name === snipName)[0];

		return msg.channel.send(snip.embed ? buildEmbed().setDescription(snip.content) : snip.content);
	}

	public async list(msg: KlasaMessage): Promise<Message> {
		const snips: Snippet[] = msg.guild!.settings.get(GuildSettings.Snippets);
		if (snips.length < 1) throw msg.language.get('COMMAND_SNIPPET_NOSNIPS');

		return msg.channel.send(`${snips.map(s => s.name).join('\n')}`);
	}

}

interface Snippet {
	name: string;
	content: string;
	embed: boolean;
}
