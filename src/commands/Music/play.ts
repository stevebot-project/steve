import { MusicCommand } from '@lib/structures/commands/MusicCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Song } from '@lib/structures/music/Song';

export default class extends MusicCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: 'Play songs from the queue.',
			examples: ['play', 'play accio deathly hallows'],
			extendedHelp: 'Play the specified song or, if none specified, the songs in the queue.',
			music: ['USER_VOICE_CHANNEL'],
			usage: '(song:song)',
			helpUsage: '(song name)'
		});

		this.createCustomResolver('song', (arg, possible, message) => arg ? this.client.arguments.get('song').run(arg, possible, message) : null);
	}

	public async run(msg: KlasaMessage, [song]: [Song]): Promise<void> {
		const { music } = msg.guild;
		const channel = this.getChannel(msg);

		if (!msg.guild.music.voiceChannel) {
			await this.store.get('join').run(msg, [song]);
			music.channelID = msg.channel.id;
		}

		if (song) {
			await this.store.get('add').run(msg, [song]);
			if (music.playing) return;
		} else if (!music.canPlay) {
			throw 'Nothing in the queue!';
		}

		if (music.playing) {
			throw 'I\'m already playing!';
		} else if (music.paused) {
			if (music.manageable(msg)) await music.resume(channel);
		} else {
			await music.play(channel);
		}
	}

}
