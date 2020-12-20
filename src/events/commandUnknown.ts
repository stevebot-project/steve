import { Event, KlasaMessage, Stopwatch } from 'klasa';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Snippet } from '../commands/Snippets/snippet';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { floatPromise } from '@utils/util';
import { Role } from 'discord.js';
import { RoleAlias } from '../commands/Role Aliases/rolealias';

export default class extends Event {

	// TODO: this is one of the messiest functions in this god-forsaken bot, fix it
	public run(msg: KlasaMessage, cmd: string): Promise<void> | undefined {
		if (!msg.guild) return;

		cmd = cmd.toLowerCase();

		/* check for exact role name matches */
		const roles
			= msg.guild.roles.cache.filter(r => (msg.guild!.settings.get(GuildSettings.Roles.Assignable) as string[]).includes(r.id))
				.map(r => r.name.toLowerCase());

		const role = roles.some(r => r === cmd);
		if (role) return this.runAssign(msg, msg.guild.roles.cache.find(r => r.name.toLowerCase() === cmd)!);

		/* check for role alias matches */
		const aliases: RoleAlias[] = msg.guild.settings.get(GuildSettings.RoleAliases);
		const aliasExists = aliases.some(a => a.alias === cmd);

		if (aliasExists) {
			const alias = aliases.filter(a => a.alias === cmd)[0];

			const realRole = msg.guild.roles.cache.get(alias.role);

			if (realRole) return this.runAssign(msg, realRole);
		}
		/* check for snip matches */
		const snips: Snippet[] = msg.guild.settings.get(GuildSettings.Snippets);
		const snip = snips.some(s => s.name === cmd);
		if (snip) return this.runSnippet(msg, cmd);
	}

	private async runAssign(msg: KlasaMessage, role: Role): Promise<void> {
		const assignCommand = this.client.commands.get('assign') as AssignCommand;
		const timer = new Stopwatch();

		try {
			await this.client.inhibitors.run(msg, assignCommand);

			try {
				const commandRun = assignCommand.run(msg, [role]);
				timer.stop();
				const response = await commandRun;
				floatPromise(this, this.client.finalizers.run(msg, assignCommand, response, timer));
			} catch (err) {
				this.client.console.error(err);
			}
		} catch (response) {
			this.client.emit('commandInhibited', msg, assignCommand, response);
		}
	}

	private async runSnippet(msg: KlasaMessage, cmd: string): Promise<void> {
		const snipCommand = this.client.commands.get('snippet') as SnippetCommand;
		const timer = new Stopwatch();

		try {
			await this.client.inhibitors.run(msg, snipCommand);

			try {
				const commandRun = snipCommand.view(msg, [cmd]);
				timer.stop();
				const response = await commandRun;
				floatPromise(this, this.client.finalizers.run(msg, snipCommand, response, timer));
			} catch (err) {
				this.client.console.error(err);
			}
		} catch (response) {
			this.client.emit('commandInhibited', msg, snipCommand, response);
		}
	}

}

interface AssignCommand extends SteveCommand {
	run(msg: KlasaMessage, roles: Role[]): Promise<KlasaMessage>;
}

interface SnippetCommand extends SteveCommand {
	add(msg: KlasaMessage, [snipName, snipContent]: [string, string]): Promise<KlasaMessage>;
	edit(msg: KlasaMessage, [snipName, snipContent]: [string, string]): Promise<KlasaMessage>;
	remove(msg: KlasaMessage, [snipName]: [string]): Promise<KlasaMessage>;
	view(msg: KlasaMessage, [snipName]: [string]): Promise<KlasaMessage>;
	source(msg: KlasaMessage, [snipName]: [string]): Promise<KlasaMessage>;
	list(msg: KlasaMessage): Promise<KlasaMessage>;
	reset(msg: KlasaMessage): Promise<KlasaMessage>;
}
