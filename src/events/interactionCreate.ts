/* If you're self-hosting Steve, you'll have to register these slash commands yourself! There's a tool to do so at
* https://github.com/tuataria/slash, although you might have to modify it to fit your specific needs.
*/
import { Event } from 'klasa';
import { Events } from '@lib/types/Enums';
import { inspect } from 'util';

export default class extends Event {

	public run(data: InteractionCreatePacket) {
		const guild = this.client.guilds.cache.get(data.guild_id) ?? null;
		const channel = guild ? guild.channels.cache.get(data.channel_id) : null;

		switch (data.data.name) {
			case 'audino':
				this.client.emit(Events.AudinoSlash, guild!, channel);
				break;
			case 'dftba':
				this.client.emit(Events.DftbaSlash, guild!, channel);
				break;
			case 'payrespects':
				this.client.emit(Events.PayRespectsSlash, guild!, channel);
				break;
			case 'rps':
				this.client.emit(Events.RpsSlash, guild!, channel, data.data.options[0].value);
				break;
			default:
				this.client.console.log(inspect(data, { depth: 4 }));
		}
	}

}

interface InteractionCreatePacket {
	version: number;
	type: number;
	token: string;
	member: InteractionCreatePacketMember;
	id: string;
	guild_id: string;
	data: InteractionCreatePacketData;
	channel_id: string;
}

interface InteractionCreatePacketMember {
	user: InteractionCreatePacketMemberUser;
	roles: string[];
	premium_since: Date | null;
	permissions: string;
	pending: boolean;
	nick: string;
	mute: boolean;
	joined_at: Date;
	is_pending: false;
	deaf: boolean;
}

interface InteractionCreatePacketMemberUser {
	id: string;
	username: string;
	avatar: string;
	discriminator: string;
	public_flags: number;
}

interface InteractionCreatePacketData {
	options: InteractionCreatePacketDataOptions[];
	name: string;
	id: string;
}

interface InteractionCreatePacketDataOptions {
	name: string;
	value: string;
}
