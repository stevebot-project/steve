import { CreateDeleteEvent } from '@lib/structures/events/CreateDeleteEvent';
import { MessageEmbed, TextChannel, VoiceChannel, NewsChannel, CategoryChannel } from 'discord.js';
import { Colors } from '@lib/types/enums';

export default class extends CreateDeleteEvent {

	public async handle(channel: TextChannel | VoiceChannel | NewsChannel | CategoryChannel, embed: MessageEmbed): Promise<MessageEmbed> {
		return embed
			.setColor(Colors.Purple)
			.setTitle(`${channel.type[0].toUpperCase()}${channel.type.slice(1)} Channel Created | ${channel.name}`);
	}

}
