import { MusicCommand } from '@lib/structures/commands/MusicCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Song } from '@lib/structures/music/Song';
import { Message } from 'discord.js';
import { MusicHandler } from '@lib/structures/music/MusicHandler';
import { GuildSettings } from '@lib/types/settings/GuildSettings';

export default class extends MusicCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: 'Add a song to the queue.',
			examples: ['add accio deathly hallows'],
			usage: '<song:song>',
			helpUsage: 'song name',
			music: ['SAME_VOICE_CHANNEL']
		});
	}

	public async run(msg: KlasaMessage, [song]: [Song]): Promise<Message> {
		const { music } = msg.guild;

		if (!this.maxEntries(music, song)) throw 'You\'ve already added the maximum amount of songs!';
		if (!this.maxLength(music, song)) throw 'This song is too long to add to the queue!';

		return msg.guild.music.add(song, this.getChannel(msg));
	}

	private maxEntries(handler: MusicHandler, song: Song): boolean {
		const maxSongEntries: number = handler.guild.settings.get(GuildSettings.Music.MaxEntries);
		const currentEntries = handler.queue.filter(queueSong => queueSong.requester === song.requester).length;
		return currentEntries < maxSongEntries;
	}

	private maxLength(handler: MusicHandler, song: Song): boolean {
		const maxSongLength: number = handler.guild.settings.get(GuildSettings.Music.MaxLength);
		return song.duration <= maxSongLength;
	}

}
