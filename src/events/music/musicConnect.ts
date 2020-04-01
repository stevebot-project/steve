import { Event } from 'klasa';
import { VoiceChannel, TextChannel, Message } from 'discord.js';
import { Emojis } from '@lib/types/enums';

export default class extends Event {

	public run(voice: VoiceChannel, text: TextChannel): Promise<Message> {
		return text.send(`${Emojis.Check} Connected to ${voice.name}!`);
	}

}
