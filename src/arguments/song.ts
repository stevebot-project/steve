import { Argument, Possible, KlasaMessage } from 'klasa';
import { Song } from '@lib/structures/music/Song';

export default class extends Argument {

	public async run(arg: string, possible: Possible, msg: KlasaMessage): Promise<Song> {
		const song = await msg.guild!.music.fetch(arg, msg.author.id);
		return song;
	}

}
