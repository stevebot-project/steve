import { Event } from 'klasa';
import { VoiceChannel, TextChannel, Message } from 'discord.js';

export default class extends Event {

	public run(voice: VoiceChannel, text: TextChannel): Promise<Message> {
		return text.send(`Disconnected from ${voice.name}.`);
	}

}
