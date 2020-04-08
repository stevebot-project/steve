import { Client } from 'klasa';

export default Client.defaultGuildSchema
	.add('channels', channels => channels
		.add('memberlog', 'TextChannel')
		.add('reminderChannel', 'TextChannel')
		.add('serverlog', 'TextChannel'))
	.add('roles', roles => roles
		.add('administrator', 'Role')
		.add('assignable', 'Role', { array: true })
		.add('deafened', 'Role')
		.add('dj', 'Role')
		.add('moderator', 'Role')
		.add('muted', 'Role')
		.add('private', 'Role', { array: true })
		.add('trusted', 'Role')
		.add('giveTrustedRoleOn', 'TrustedRoleSetting', { 'default': 'none' }))
	.add('music', music => music
		.add('maxEntries', 'Integer', { 'default': 50 })
		.add('maxLength', 'Integer', { 'default': 450000 }))
	.add('maxMentions', 'Integer', { 'default': 25 })
	.add('wordBlacklist', 'Boolean', { 'default': true });
