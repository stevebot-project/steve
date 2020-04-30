/* eslint-disable id-length */
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Message } from 'discord.js';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['snippet', 'snip'],
			description: lang => lang.get('COMMAND_SNIPPETS_DESCRIPTION'),
			helpUsage: '<add|remove|list|edit|view> (snippetName) (snippetContent)',
			examples: ['snippets rule1', 'snippet add|rule1|the word of the jonathans is law', 'snip remove|rule1'],
			runIn: ['text'],
			subcommands: true,
			usage: '<add|remove|list|edit|view:default> (snippetName:snippetName) (snippetContent:snippetContent{,1900})'
		});

		this
			.createCustomResolver('snippetName', (str, possible, msg, [action]) => action !== 'list' ? str : null)
			.createCustomResolver('snippetContent', (str, possible, msg, [action]) => action === 'add' || action === 'edit' ? str : null);
	}

	public async add(msg: KlasaMessage, [snipName, snipContent]: [string, string]): Promise<Message> {
		if (!msg.member.isStaff) throw msg.language.get('COMMAND_SNIPPETS_ACCESS_DENIED');

		const newSnip: Snippet = { name: snipName, content: snipContent };
		const snips: Snippet[] = msg.guild.settings.get(GuildSettings.Snippets);
		if (snips.filter(s => s.name === newSnip.name).length > 0) throw msg.language.get('COMMAND_SNIPPETS_ALREADY_EXISTS', snipName);

		await msg.guild.settings.update(GuildSettings.Snippets, newSnip, { action: 'add' });

		return msg.channel.send(msg.language.get('COMMAND_SNIPPETS_ADDED_SNIPPET', newSnip.name));
	}

	public async edit(msg: KlasaMessage, [snipName, snipContent]: [string, string]): Promise<Message> {
		if (!msg.member.isStaff) throw msg.language.get('COMMAND_SNIPPETS_ACCESS_DENIED');

		const snips: Snippet[] = msg.guild.settings.get(GuildSettings.Snippets);
		const snipsClone = snips.slice();
		const index = snipsClone.map(s => s.name).indexOf(snipName);

		snipsClone[index].content = snipContent;
		await msg.guild.settings.update(GuildSettings.Snippets, snipsClone, { action: 'overwrite' });

		return msg.channel.send(msg.language.get('COMMAND_SNIPPETS_EDIT_SNIPPET', snipName));
	}

	public async remove(msg: KlasaMessage, [snipName]: [string]): Promise<Message> {
		if (!msg.member.isStaff) throw msg.language.get('COMMAND_SNIPPETS_ACCESS_DENIED');

		const snips: Snippet[] = msg.guild.settings.get(GuildSettings.Snippets);
		const snipsClone = snips.slice();
		const index = snipsClone.map(s => s.name).indexOf(snipName);

		snipsClone.splice(index, 1);
		await msg.guild.settings.update(GuildSettings.Snippets, snipsClone, { action: 'overwrite' });

		return msg.channel.send(msg.language.get('COMMAND_SNIPPETS_REMOVE_SNIPPET', snipName));
	}

	public async view(msg: KlasaMessage, [snipName]: [string]): Promise<Message> {
		const snips: Snippet[] = msg.guild.settings.get(GuildSettings.Snippets);
		if (snips.filter(s => s.name === snipName).length === 0) throw msg.language.get('COMMAND_SNIPPETS_DOES_NOT_EXIST', snipName);

		return msg.channel.send(snips.filter(s => s.name === snipName)[0]);
	}

	public async list(msg: KlasaMessage): Promise<Message> {
		const snips: Snippet[] = msg.guild.settings.get(GuildSettings.Snippets);
		if (snips.length < 1) throw msg.language.get('COMMAND_SNIPPETS_NO_SNIPPETS');

		return msg.channel.send(`${snips.map(s => s.name).join('\n')}`);
	}

}

interface Snippet {
	name: string;
	content: string;
}
