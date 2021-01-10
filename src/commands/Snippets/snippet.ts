/* eslint-disable id-length */
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandOptions, RichDisplay } from 'klasa';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Message, MessageEmbed } from 'discord.js';
import { chunk, codeBlock } from '@klasa/utils';
import { ApplyOptions, requiredPermissions, requiresPermission } from '@skyra/decorators';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildMessage } from '@lib/types/Messages';

@ApplyOptions<CommandOptions>({
	aliases: ['snippets', 'snip', 'customcommand'],
	description: lang => lang.tget('COMMAND_SNIPPET_DESCRIPTION'),
	extendedHelp: lang => lang.tget('COMMAND_SNIPPET_EXTENDED'),
	runIn: ['text'],
	subcommands: true,
	usage: '<add|remove|list|edit|reset|source|view:default> (name:name{,100}) (content:content{,1900})'
})
export default class extends SteveCommand {

	public async init() {
		this
			.createCustomResolver('name', (str, possible, msg, [action]) => action === 'list' ? null : str)
			.createCustomResolver('content', (str, possible, msg, [action]) => action === 'add' || action === 'edit' ? str : null);
	}

	@requiresPermission(PermissionsLevels.MODERATOR, (msg: GuildMessage) => {
		throw msg.guild.language.tget('COMMAND_SNIPPET_NOPERMISSION');
	})
	public async add(msg: GuildMessage, [snipName, snipContent]: [string, string]): Promise<Message> {
		const snips: Snippet[] = msg.guild.settings.get(GuildSettings.Snippets);
		if (snips.some(snip => snip.name === snipName)) throw msg.guild.language.tget('COMMAND_SNIPPET_ALREADYEXISTS', snipName);

		const newSnip = this.createSnip(msg, snipName, snipContent);
		await msg.guild.settings.update(GuildSettings.Snippets, newSnip, { action: 'add' });

		return msg.channel.send(msg.guild.language.tget('COMMAND_SNIPPET_ADD', newSnip.name));
	}

	@requiresPermission(PermissionsLevels.MODERATOR, (msg: GuildMessage) => {
		throw msg.guild.language.tget('COMMAND_SNIPPET_NOPERMISSION');
	})
	public async edit(msg: GuildMessage, [snipName, snipContent]: [string, string]): Promise<Message> {
		const snips: Snippet[] = msg.guild.settings.get(GuildSettings.Snippets);
		const index = snips.findIndex(snip => snip.name === snipName);
		if (index === -1) throw msg.guild.language.tget('COMMAND_SNIPPET_INVALID', snipName);

		await msg.guild.settings.update(GuildSettings.Snippets, this.createSnip(msg, snipName, snipContent), { arrayPosition: index });

		return msg.channel.send(msg.guild.language.tget('COMMAND_SNIPPET_EDIT', snipName));
	}

	@requiresPermission(PermissionsLevels.MODERATOR, (msg: GuildMessage) => {
		throw msg.guild.language.tget('COMMAND_SNIPPET_NOPERMISSION');
	})
	public async remove(msg: GuildMessage, [snipName]: [string]): Promise<Message> {
		const snips: Snippet[] = msg.guild.settings.get(GuildSettings.Snippets);
		const snip = snips.find(snip => snip.name === snipName.toLowerCase());
		if (!snip) throw msg.guild.language.tget('COMMAND_SNIPPET_INVALID', snipName);

		await msg.guild.settings.update(GuildSettings.Snippets, snip, { action: 'remove' });

		return msg.channel.send(msg.guild.language.tget('COMMAND_SNIPPET_REMOVE', snipName));
	}

	public async view(msg: GuildMessage, [snipName]: [string]): Promise<Message> {
		if (!snipName) {
			return this.list(msg);
		}

		const snips: Snippet[] = msg.guild.settings.get(GuildSettings.Snippets);

		const snip = snips.find(s => s.name === snipName.toLowerCase());
		if (!snip) throw msg.guild.language.tget('COMMAND_SNIPPET_INVALID', snipName);

		return msg.channel.send(snip.embed ? new MessageEmbed().setDescription(snip.content) : snip.content);
	}

	@requiredPermissions('EMBED_LINKS')
	public async list(msg: GuildMessage): Promise<Message> {
		const snips: Snippet[] = msg.guild.settings.get(GuildSettings.Snippets);
		if (!snips.length) throw msg.guild.language.tget('COMMAND_SNIPPET_NOSNIPS');

		const response = await msg.send(new MessageEmbed()
			.setDescription('Loading...'));

		const prefix = msg.guild.settings.get(GuildSettings.Prefix);
		const display = new RichDisplay(new MessageEmbed());

		for (const page of chunk(snips, 30)) {
			const description = `\`${page.map(snip => `${prefix}${snip.name}`).join('`, `')}\``;
			display.addPage((embed: MessageEmbed) => embed.setDescription(description));
		}

		await display.run(response);
		return response;
	}

	@requiresPermission(PermissionsLevels.MODERATOR, (msg: GuildMessage) => {
		throw msg.guild.language.tget('COMMAND_SNIPPET_NOPERMISSION');
	})
	public async reset(msg: GuildMessage): Promise<Message> {
		await msg.guild.settings.reset(GuildSettings.Snippets);

		return msg.channel.send(msg.guild.language.tget('COMMAND_SNIPPET_RESET'));
	}

	public source(msg: GuildMessage, [snipName]: string): Promise<Message> | null {
		const snips: Snippet[] = msg.guild.settings.get(GuildSettings.Snippets);
		const snip = snips.find(s => s.name === snipName);
		return snip ? msg.channel.send(codeBlock('md', snip.content)) : null;
	}

	private createSnip(msg: GuildMessage, name: string, content: string): Snippet {
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
