import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionLevels } from '@lib/types/enums';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message, Permissions, GuildMember, PermissionString } from 'discord.js';
import { newEmbed } from '@lib/util/util';

const PERM_FLAGS = Object.keys(Permissions.FLAGS) as PermissionString[];

const Perms = {
	CREATE_INSTANT_INVITE: 'Create Instant Invite',
	KICK_MEMBERS: 'Kick Members',
	BAN_MEMBERS: 'Ban Members',
	MANAGE_CHANNELS: 'Manage Channels',
	MANAGE_GUILD: 'Manage Guild',
	ADD_REACTIONS: 'Add Reactions',
	VIEW_AUDIT_LOG: 'View Audit Log',
	PRIORITY_SPEAKER: 'Priority Speaker',
	STREAM: 'Stream',
	VIEW_CHANNEL: 'View Channel',
	SEND_MESSAGES: 'Send Messages',
	SEND_TTS_MESSAGES: 'Send TTS Messages',
	MANAGE_MESSAGES: 'Manage Messages',
	EMBED_LINKS: 'Embed Links',
	ATTACH_FILES: 'Attach Files',
	READ_MESSAGE_HISTORY: 'Read Message History',
	MENTION_EVERYONE: 'Mention Everyone',
	USE_EXTERNAL_EMOJIS: 'Use External Emojis',
	CONNECT: 'Connect',
	SPEAK: 'Speak',
	MUTE_MEMBERS: 'Mute Members',
	DEAFEN_MEMBERS: 'Deafen Members',
	MOVE_MEMBERS: 'Move Members',
	USE_VAD: 'Use VAD',
	CHANGE_NICKNAME: 'Change Nickname',
	MANAGE_NICKNAMES: 'Manage Nicknames',
	MANAGE_ROLES: 'Manage Roles',
	MANAGE_WEBHOOKS: 'Manage Webhooks',
	MANAGE_EMOJIS: 'Manage Emojis'
};

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: 'View the permissions of the specified member.',
			helpUsage: 'member',
			permissionLevel: PermissionLevels.MODERATOR,
			usage: '<member:membername>'
		});
	}

	async run(msg: KlasaMessage, [targetMember]: [GuildMember]): Promise<Message> {
		targetMember = await msg.guild.members.fetch(targetMember.id);
		const { permissions } = targetMember;

		const permList: string[] = [];

		if (permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
			permList.push('This member is an administrator; they have all permissions!');
		} else {
			for (const flag of PERM_FLAGS) {
				if (permissions.has(flag)) permList.push(`🔹 ${Perms[flag]}`);
			}
		}

		const embed = newEmbed()
			.setAuthor(targetMember.user.tag, targetMember.user.displayAvatarURL())
			.setDescription(permList.join('\n'));

		return msg.channel.send(embed);
	}

}
