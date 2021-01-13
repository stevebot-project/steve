import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildMessage } from '@lib/types/Messages';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { ApplyOptions } from '@skyra/decorators';
import { Role } from 'discord.js';
import { CommandOptions } from 'klasa';

@ApplyOptions<CommandOptions>({
	aliases: ['ra'],
	description: lang => lang.tget('commandRolealiasDescription'),
	extendedHelp: lang => lang.tget('commandRolealiasExtended'),
	permissionLevel: PermissionsLevels.MODERATOR,
	runIn: ['text'],
	subcommands: true,
	usage: '<add|remove> <alias:string{2,30}> (role:rolename)'
})
export default class extends SteveCommand {

	public async init() {
		this.createCustomResolver('rolename', (str, possible, msg, [action]) => action === 'add'
			? this.client.arguments.get('rolename').run(str, possible, msg)
			: null);
	}

	public async add(msg: GuildMessage, [alias, role]: [string, Role]) {
		const roleAliases: RoleAlias[] = msg.guild.settings.get(GuildSettings.RoleAliases);

		if (this.roleAliasExists(roleAliases, alias)) {
			throw msg.guild.language.tget('commandRolealiasAlreadyexists', alias);
		}

		await msg.guild.settings.update(GuildSettings.RoleAliases, this.createRoleAlias(alias, role), { action: 'add' });

		return msg.channel.send(msg.guild.language.tget('commandRolealiasAdd', alias.toLowerCase(), role.name));
	}

	public async remove(msg: GuildMessage, [alias]: [string]) {
		const roleAliases: RoleAlias[] = msg.guild.settings.get(GuildSettings.RoleAliases);

		if (!this.roleAliasExists(roleAliases, alias)) {
			throw msg.guild.language.tget('commandRolealiasDoesnotexist', alias);
		}

		const removedAlias = roleAliases.find(ra => ra.alias === alias.toLowerCase());

		await msg.guild.settings.update(GuildSettings.RoleAliases, removedAlias, { action: 'remove' });

		return msg.channel.send(msg.guild.language.tget('commandRolealiasRemove', alias.toLowerCase()));
	}

	private createRoleAlias(alias: string, role: Role): RoleAlias {
		return { alias: alias.toLowerCase().replace(/ /g, ''), role: role.id };
	}

	private roleAliasExists(aliases: RoleAlias[], newAlias: string) {
		return aliases.some(alias => alias.alias === newAlias.toLowerCase());
	}

}

export interface RoleAlias {
	alias: string;
	role: string; // snowflake
}
