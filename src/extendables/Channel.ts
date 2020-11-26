import { Extendable, ExtendableStore } from 'klasa';
import { Channel, TextChannel } from 'discord.js';


export default class extends Extendable {

	public constructor(store: ExtendableStore, file: string[], directory: string) {
		super(store, file, directory, { appliesTo: [Channel] });
	}

	public isGuildTextChannel(this: Channel): this is TextChannel {
		return this instanceof TextChannel;
	}

}
