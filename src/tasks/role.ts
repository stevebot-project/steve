import { Task } from 'klasa';
import { GuildMember } from 'discord.js';

export default class extends Task {

	public async run({ user, guild, role }): Promise<GuildMember> {
		const _guild = this.client.guilds.cache.get(guild);
		const member = _guild.members.cache.get(user);
		const _role = _guild.roles.cache.get(role);

		if (!member || !_role) return;

		const toggle = member.roles.cache.has(_role.id);

		if (toggle) {
			return member.roles.remove(_role);
		} else {
			return member.roles.add(_role);
		}
	}

}
