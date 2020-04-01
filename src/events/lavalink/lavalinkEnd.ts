import { Event } from 'klasa';
import { MusicHandler } from '@lib/structures/music/MusicHandler';
import { Events } from '@lib/types/enums';

export default class extends Event {

	public run(handler: MusicHandler): boolean {
		return this.client.emit(Events.MusicSongFinish, handler);
	}

}
