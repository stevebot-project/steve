import { Client } from 'klasa';

export default Client.defaultGuildSchema
	.add('moderation', moderation => moderation
		.add('banDeleteDays', 'Integer', { 'default': 0 })
		.add('cases', 'any', { array: true, configurable: false }))
	.add('roles', roles => roles
		.add('administrator', 'Role')
		.add('deafened', 'Role')
		.add('moderator', 'Role')
		.add('muted', 'Role')
		.add('trusted', 'Role'));
