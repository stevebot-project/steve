/* eslint-disable complexity */
import { MusicBitField } from '@lib/structures/music/MusicBitField';
import { MusicCommand } from '@lib/structures/commands/MusicCommand';
import { Inhibitor, KlasaMessage, Command, InhibitorStore } from 'klasa';
import { Emojis } from '@lib/types/enums';
const { FLAGS } = MusicBitField;

export default class extends Inhibitor {

	public constructor(store: InhibitorStore, file: string[], directory: string) {
		super(store, file, directory, { spamProtection: true });
	}

	public async run(msg: KlasaMessage, cmd: Command | MusicCommand): Promise<void> { // eslint-disable-line @typescript-eslint/require-await
		if (!(cmd instanceof MusicCommand) || !cmd.music.bitfield || msg.channel.type !== 'text') return;

		const { music } = msg.guild!;

		/* check if queue is empty */
		if (cmd.music.has(FLAGS.QUEUE_NOT_EMPTY) && !music.canPlay) {
			if (music.playing) {
				throw 'The last song in the queue is playing!';
			} else {
				throw `${Emojis.Empty} No songs in the queue!`;
			}
		}

		/* check if playing */
		if (cmd.music.has(FLAGS.VOICE_PLAYING) && !music.playing) {
			if (music.paused) {
				throw 'Playback is paused!';
			} else {
				throw 'Playback is stopped!';
			}
		}

		/* check if paused */
		if (cmd.music.has(FLAGS.VOICE_PAUSED) && !music.paused) {
			if (music.playing) {
				throw 'but stuff is playing tho';
			} else {
				throw 'Playback is stopped!';
			}
		}

		if (cmd.music.has(FLAGS.USER_VOICE_CHANNEL)) {
			if (!msg.member!.voice.channelID) throw 'yo it would be lit if you could join a voice channel fam';
		}
		if (cmd.music.has(FLAGS.STEVE_VOICE_CHANNEL)) {
			if (!msg.guild!.me!.voice.channelID) throw 'I need to be in a voice channel for that! Help me out please.';
		}
		if (cmd.music.has(FLAGS.SAME_VOICE_CHANNEL) && msg.member!.voice.channelID !== msg.guild!.me!.voice.channelID) {
			throw 'imma need you to be in hte same voice channel as me';
		}

		if (cmd.music.has(FLAGS.MANAGEABLE) && !music.manageable(msg)) {
			throw 'You need to be a DJ to do that!';
		}
	}

}
