import { Event } from 'klasa';
import { MusicHandler } from '@lib/structures/music/MusicHandler';
import { Events, Emojis } from '@lib/types/enums';
import { Song } from '@lib/structures/music/Song';

export default class extends Event {

	public async run(handler: MusicHandler): Promise<void> {
		if (handler.replay) {
			await handler.player.play(handler.song!.track);
			this.client.emit(Events.MusicSongReplay, handler.textChannel);
		} else if (handler.queue.length < 1) {
			handler.textChannel!.setTopic('');
			await handler.textChannel!.send(`${Emojis.Empty} No more songs in the queue!`);
			return handler.reset();
		} else {
			handler.song = handler.queue.shift() as Song;
			await handler.player.play(handler.song!.track);
			this.client.emit(Events.MusicSongPlay, handler.song, handler.textChannel);
		}
	}

}
