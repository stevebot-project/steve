/* eslint-disable @typescript-eslint/no-namespace */

export namespace GuildSettings {

	export const DeletePinMessages = 'deletePinMessages';
	export const DisabledCommands = 'disabledCommands';
	export const DisableNaturalPrefix = 'disableNaturalPrefix';
	export const IgnoredChannels = 'ignoredChannels';
	export const IgnoredRoles = 'ignoredRoles';
	export const Language = 'language';
	export const MaxMentions = 'maxMentions';
	export const Prefix = 'prefix';
	export const RoleAliases = 'roleAliases';
	export const Snippets = 'snippets';

	export namespace Channels {
		export const Memberlog = 'channels.memberlog';
		export const ReminderChannel = 'channels.reminderChannel';
		export const Serverlog = 'channels.serverlog';
	}

	export namespace LogEvents {
		export const ChannelCreate = 'logEvents.channelCreate';
		export const ChannelDelete = 'logEvents.channelDelete';
		export const ChannelUpdate = 'logEvents.channelUpdate';
		export const EmojiCreate = 'logEvents.emojiCreate';
		export const EmojiDelete = 'logEvents.emojiDelete';
		export const EmojiUpdate = 'logEvents.emojiUpdate';
		export const GuildBanAdd = 'logEvents.guildBanAdd';
		export const GuildBanRemove = 'logEvents.guildBanRemove';
		export const GuildMemberAdd = 'logEvents.guildMemberAdd';
		export const GuildMemberRemove = 'logEvents.guildMemberRemove';
		export const GuildMemberUpdate = 'logEvents.guildMemberUpdate';
		export const InviteCreate = 'logEvents.inviteCreate';
		export const InviteDelete = 'logEvents.inviteDelete';
		export const MessageDelete = 'logEvents.messageDelete';
		export const MessageDeleteBulk = 'logEvents.messageDeleteBulk';
		export const RoleCreate = 'logEvents.roleCreate';
		export const RoleDelete = 'logEvents.roleDelete';
		export const RoleUpdate = 'logEvents.roleUpdate';
	}

	export namespace Moderation {
		export const BanDeleteDays = 'moderation.banDeleteDays';
		export const Cases = 'moderation.cases';
	}

	export namespace Roles {
		export const Administrator = 'roles.administrator';
		export const Assignable = 'roles.assignable';
		export const Deafened = 'roles.deafened';
		export const Moderator = 'roles.moderator';
		export const Muted = 'roles.muted';
		export const Restricted = 'roles.restricted';
		export const Trusted = 'roles.trusted';
		export const GiveTrustedRoleOn = 'roles.giveTrustedRoleOn';
		export const RequireTrustedRoleForSelfAssign = 'roles.requireTrustedRoleForSelfAssign';
	}

	export namespace WordBlacklist {
		export const Enabled = 'wordBlacklist.enabled';
		export const List = 'wordBlacklist.wordList';
	}
}
