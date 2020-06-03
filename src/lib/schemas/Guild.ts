import { Client } from 'klasa';

export default Client.defaultGuildSchema
	.add('roles', roles => roles
		.add('administrator', 'Role')
		.add('moderator', 'Role')
		.add('trusted', 'Role'));
