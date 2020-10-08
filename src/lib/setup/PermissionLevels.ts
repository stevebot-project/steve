import { Client, PermissionLevels } from 'klasa';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Permissions } from 'discord.js';

export default Client.defaultPermissionLevels = new PermissionLevels()
	.add(PermissionsLevels.EVERYONE, () => true)
	.add(PermissionsLevels.TRUSTED, msg => msg.member
		? msg.guild!.settings.get(GuildSettings.Roles.Trusted)
			? msg.member.roles.cache.has(msg.guild!.settings.get(GuildSettings.Roles.Trusted))
			: false
		: false, { fetch: true })
	.add(PermissionsLevels.MODERATOR, msg => msg.member
		? msg.guild!.settings.get(GuildSettings.Roles.Moderator)
			? msg.member.roles.cache.has(msg.guild!.settings.get(GuildSettings.Roles.Moderator))
			: msg.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)
		: false, { fetch: true })
	.add(PermissionsLevels.ADMINISTRATOR, msg => msg.member
		? msg.guild!.settings.get(GuildSettings.Roles.Administrator)
			? msg.member.roles.cache.has(msg.guild!.settings.get(GuildSettings.Roles.Administrator))
			: msg.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)
		: false, { fetch: true })
	.add(PermissionsLevels.OWNER, ({ author, client }) => client.owners.has(author));
