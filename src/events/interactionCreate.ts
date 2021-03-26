/* If you're self-hosting Steve, you'll have to register these slash commands yourself! There's a tool to do so at
* https://github.com/tuataria/slash, although you might have to modify it to fit your specific needs.
*/
import { Event } from 'klasa';
import { Events } from '@lib/types/Enums';
import { inspect } from 'util';

export default class extends Event {

	public run(data: InteractionCreatePacket) {
		switch (data.data.name) {
			case 'dftba':
				this.client.emit(Events.DftbaSlash, data);
				break;
			case 'rps':
				this.client.emit(Events.RpsSlash, data);
				break;
			default:
				this.client.console.log(inspect(data, { depth: 4 }));
		}
	}

}

export interface InteractionCreatePacket {
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
