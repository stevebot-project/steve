/* eslint-disable @typescript-eslint/no-explicit-any */
import { SteveCommand, SteveCommandOptions } from './SteveCommand';
import { CommandStore, util, KlasaMessage, Piece } from 'klasa';
import { MusicBitField, MusicBitFieldString } from '../music/MusicBitField';
import { BitFieldResolvable, TextChannel } from 'discord.js';
import { LAVALINK_ENABLE } from '@root/config';

export abstract class MusicCommand extends SteveCommand {

	public music: MusicBitField;

	protected constructor(store: CommandStore, file: string[], directory: string, options: MusicCommandOptions) {
		util.mergeDefault({ runIn: ['text'], music: 0 }, options);
		super(store, file, directory, options);

		this.music = new MusicBitField(options.music);
	}

	public getChannel(msg: KlasaMessage): TextChannel {
		const { music } = msg.guild;
		const { client } = music;
		const channel = music.channelID ? client.channels.cache.get(music.channelID) : client.channels.cache.get(msg.channel.id);
		return channel as TextChannel;
	}

	public async init(): Promise<Piece> {
		if (!LAVALINK_ENABLE) return this.disable();
	}

}

export interface MusicCommandOptions extends SteveCommandOptions {
	music?: BitFieldResolvable<MusicBitFieldString>;
}
