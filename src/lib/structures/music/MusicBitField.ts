/* eslint-disable no-bitwise */
import { BitField } from 'discord.js';

export class MusicBitField extends BitField<MusicBitFieldString> {

	public static FLAGS: Record<MusicBitFieldString, number> = {
		USER_VOICE_CHANNEL: 1 << 0,
		STEVE_VOICE_CHANNEL: 1 << 1,
		SAME_VOICE_CHANNEL: 1 << 2,
		QUEUE_NOT_EMPTY: 1 << 3,
		VOICE_PLAYING: 1 << 4,
		VOICE_PAUSED: 1 << 5,
		MANAGEABLE: 1 << 6
	};

}

/**
 * The bitfields for the MusicBitField
 */
export type MusicBitFieldString = 'USER_VOICE_CHANNEL' | 'STEVE_VOICE_CHANNEL' | 'SAME_VOICE_CHANNEL' | 'QUEUE_NOT_EMPTY' | 'VOICE_PLAYING' | 'VOICE_PAUSED' | 'MANAGEABLE';
