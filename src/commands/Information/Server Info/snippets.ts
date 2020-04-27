/* eslint-disable id-length */
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Message } from 'discord.js';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['snippet', 'snip'],
			description: 'Easily access useful bits of information about the server.',
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
		if (!msg.member.isStaff) throw 'You do not have permission to do this!';

		const newSnip: Snippet = { name: snipName, content: snipContent };
		const snips: Snippet[] = msg.guild.settings.get(GuildSettings.Snippets);
		if (snips.filter(s => s.name === newSnip.name).length > 0) throw `There is already a snippet with the name ${snipName}!`;

		await msg.guild.settings.update(GuildSettings.Snippets, newSnip, { action: 'add' });

		return msg.channel.send(`Added snippet with name: ${newSnip.name}.`);
	}

	public async edit(msg: KlasaMessage, [snipName, snipContent]: [string, string]): Promise<Message> {
		if (!msg.member.isStaff) throw 'You do not have permission to do this!';

		const snips: Snippet[] = msg.guild.settings.get(GuildSettings.Snippets);
		const snipsClone = snips.slice();
		const index = snipsClone.map(s => s.name).indexOf(snipName);

		snipsClone[index].content = snipContent;
		await msg.guild.settings.update(GuildSettings.Snippets, snipsClone, { action: 'overwrite' });

		return msg.channel.send(`The ${snipName} snippet has been updated.`);
	}

	public async remove(msg: KlasaMessage, [snipName]: [string]): Promise<Message> {
		if (!msg.member.isStaff) throw 'You do not have permission to do this!';

		const snips: Snippet[] = msg.guild.settings.get(GuildSettings.Snippets);
		const snipsClone = snips.slice();
		const index = snipsClone.map(s => s.name).indexOf(snipName);

		snipsClone.splice(index, 1);
		await msg.guild.settings.update(GuildSettings.Snippets, snipsClone, { action: 'overwrite' });

		return msg.channel.send(`The ${snipName} snipped has been removed.`);
	}

	public async view(msg: KlasaMessage, [snipName]: [string]): Promise<Message> {
		const snips: Snippet[] = msg.guild.settings.get(GuildSettings.Snippets);
		if (snips.filter(s => s.name === snipName).length === 0) throw `There is no snippet with the name **${snipName}**`;

		return msg.channel.send(snips.filter(s => s.name === snipName)[0]);
	}

	public async list(msg: KlasaMessage): Promise<Message> {
		const snips: Snippet[] = msg.guild.settings.get(GuildSettings.Snippets);
		if (snips.length < 1) throw 'This server has no snippets to list.';

		return msg.channel.send(`${snips.map(s => s.name).join('\n')}`);
	}

}

interface Snippet {
	name: string;
	content: string;
}
