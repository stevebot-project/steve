import { Extendable, ExtendableOptions } from 'klasa';
import { Channel, TextChannel } from 'discord.js';
import { ApplyOptions } from '@skyra/decorators';


@ApplyOptions<ExtendableOptions>({
	appliesTo: [Channel]
})
export default class extends Extendable {

	public isGuildTextChannel(this: Channel): this is TextChannel {
		return this instanceof TextChannel;
	}

}
