import { Event } from 'klasa';
import { Guild, GuildChannel } from 'discord.js';

export default class extends Event {

	public run(guild: Guild, channel: GuildChannel) {
		if (channel.isText()) return channel.send(guild.language.randomDftba);
	}

}
