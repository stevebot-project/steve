import { Client } from 'klasa';

export default Client.defaultClientSchema
	.add('wordBlacklist', 'String', { array: true });
