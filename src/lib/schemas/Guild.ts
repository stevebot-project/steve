import { Client } from 'klasa';

export default Client.defaultGuildSchema
	.add('channels', channels => channels
		.add('memberlog', 'TextChannel')
		.add('reminderChannel', 'TextChannel')
		.add('serverlog', 'TextChannel'))
	.add('deletePinMessages', 'Boolean', { 'default': false })
	.add('logEvents', logEvents => logEvents
		.add('channelCreate', 'Boolean', { 'default': true })
		.add('channelDelete', 'Boolean', { 'default': true })
		.add('channelUpdate', 'Boolean', { 'default': true })
		.add('emojiCreate', 'Boolean', { 'default': true })
		.add('emojiDelete', 'Boolean', { 'default': true })
		.add('emojiUpdate', 'Boolean', { 'default': true })
		.add('guildBanAdd', 'Boolean', { 'default': true })
		.add('guildBanRemove', 'Boolean', { 'default': true })
		.add('guildMemberAdd', 'Boolean', { 'default': true })
		.add('guildMemberRemove', 'Boolean', { 'default': true })
		.add('guildMemberUpdate', 'Boolean', { 'default': true })
		.add('inviteCreate', 'Boolean', { 'default': true })
		.add('inviteDelete', 'Boolean', { 'default': true })
		.add('messageDelete', 'Boolean', { 'default': true })
		.add('messageDeleteBulk', 'Boolean', { 'default': true })
		.add('roleCreate', 'Boolean', { 'default': true })
		.add('roleDelete', 'Boolean', { 'default': true })
		.add('roleUpdate', 'Boolean', { 'default': true }))
	.add('maxMentions', 'Integer', { 'default': 25 })
	.add('moderation', moderation => moderation
		.add('banDeleteDays', 'Integer', { 'default': 0 })
		.add('cases', 'any', { array: true, configurable: false }))
	.add('roles', roles => roles
		.add('administrator', 'Role')
		.add('assignable', 'Role', { array: true })
		.add('deafened', 'Role')
		.add('moderator', 'Role')
		.add('muted', 'Role')
		.add('restricted', 'Role', { array: true })
		.add('trusted', 'Role')
		.add('giveTrustedRoleOn', 'TrustedRoleSetting', { 'default': 'none' })
		.add('requireTrustedRoleForSelfAssign', 'Boolean', { 'default': false }))
	.add('roleAliases', 'any', { array: true, configurable: false })
	.add('snippets', 'any', { array: true, configurable: false })
	.add('wordBlacklist', wordBlacklist => wordBlacklist
		.add('enabled', 'Boolean', { 'default': true })
		.add('wordList', 'String', { array: true }));
