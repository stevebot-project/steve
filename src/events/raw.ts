import { floatPromise } from '@utils/util';
import { Guild, GuildChannel } from 'discord.js';
import { Event } from 'klasa';

export default class extends Event {

	public run(packet: RawEventPacket) {
		if (packet.t === 'INTERACTION_CREATE') return this.handleSlashCommands(packet.d as InteractionCreateData);
	}

	private handleSlashCommands(data: InteractionCreateData) {
		const guild = this.client.guilds.cache.get(data.guild_id) ?? null;
		const channel = guild ? guild.channels.cache.get(data.channel_id) : null;

		if (data.data.name === 'audino' && channel) floatPromise(this, this.audinoSlash(guild!, channel));
		if (data.data.name === 'dftba' && channel) floatPromise(this, this.dftbaSlash(guild!, channel));
		if (data.data.name === 'pressf' && channel) floatPromise(this, this.pressfSlash(guild!, channel));
	}

	private async audinoSlash(guild: Guild, channel: GuildChannel) {
		if (channel.isText()) {
			return channel.send(guild.language.tget('COMMAND_AUDINO_ID'),
				{ files: [{ attachment: './assets/images/john_screech.png', name: 'john_screech.png' }] });
		}
	}

	private async dftbaSlash(guild: Guild, channel: GuildChannel) {
		if (channel.isText()) return channel.send(guild.language.randomDftba);
	}

	private async pressfSlash(guild: Guild, channel: GuildChannel) {
		if (channel.isText()) {
			return channel.send(guild.language.tget('COMMAND_F_ID'),
				{ files: [{ attachment: './assets/images/f.png', name: 'pay_respects.png' }] });
		}
	}

}

interface RawEventPacket {
	t: string | null;
	s: number | null;
	op: number;
	d: any;
}

interface InteractionCreateData {
	version: number;
	type: number;
	token: string;
	member: {
		user: {
			id: string;
			username: string;
			avatar: string;
			discriminator: string;
			public_flags: number;
		};
		roles: string[];
		premium_since: Date | null;
		permissions: string;
		pending: boolean;
		nick: string;
		mute: boolean;
		joined_at: Date;
		is_pending: false;
		deaf: boolean;
	};
	id: string;
	guild_id: string;
	data: {
		options: InteractionCreateDataOptions[];
		name: string;
		id: string;
	};
	channel_id: string;
}

interface InteractionCreateDataOptions {
	name: string;
	value: string;
}
