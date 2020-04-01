import { Client, PermissionLevels } from 'klasa';
import { PermissionLevels as Levels } from '@lib/types/enums';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Permissions } from 'discord.js';

export default Client.defaultPermissionLevels = new PermissionLevels()
	.add(Levels.EVERYONE, () => true)
	.add(Levels.TRUSTED, msg => msg.member
		? msg.guild.settings.get(GuildSettings.Roles.Trusted)
			? msg.member.roles.cache.has(msg.guild.settings.get(GuildSettings.Roles.Trusted))
			: false
		: false, { fetch: true })
	.add(Levels.MODERATOR, msg => msg.member
		? msg.guild.settings.get(GuildSettings.Roles.Moderator)
			? msg.member.roles.cache.has(msg.guild.settings.get(GuildSettings.Roles.Moderator))
			: msg.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)
		: false, { fetch: true })
	.add(Levels.ADMINISTRATOR, msg => msg.member
		? msg.guild.settings.get(GuildSettings.Roles.Administrator)
			? msg.member.roles.cache.has(msg.guild.settings.get(GuildSettings.Roles.Administrator))
			: msg.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)
		: false, { fetch: true })
	.add(Levels.OWNER, ({ author, client }) => client.owners.has(author));
