import { Client } from 'klasa';

export default Client.defaultGuildSchema
	.add('channels', channels => channels
		.add('memberlog', 'TextChannel')
		.add('reminderChannel', 'TextChannel')
		.add('serverlog', 'TextChannel'))
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
	.add('snippets', 'any', { array: true, configurable: false })
	.add('wordBlacklist', wordBlacklist => wordBlacklist
		.add('enabled', 'Boolean', { 'default': true })
		.add('wordList', 'String', { array: true }));
