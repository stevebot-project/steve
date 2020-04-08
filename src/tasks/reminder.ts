import { Task } from 'klasa';
import { Message, TextChannel, DMChannel, GuildChannel } from 'discord.js';

export default class extends Task {

	public async run({ user, content, channel }: ReminderData): Promise<Message | void> {
		const _channel = this.client.channels.cache.get(channel);
		const _user = _channel instanceof GuildChannel
			? _channel.guild.members.fetch(user).catch(err => this.client.console.error(err))
			: this.client.users.cache.get(user);

		if (_user) return (_channel as TextChannel | DMChannel).send(`${_user}, here's the reminder you asked for: **${content}**`);
	}

}

interface ReminderData {
	user: string;
	content: string;
	channel: string;
}
