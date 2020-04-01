import { CreateDeleteEvent } from '@lib/structures/events/CreateDeleteEvent';
import { GuildEmoji, MessageEmbed } from 'discord.js';
import { Colors } from '@lib/types/enums';

export default class extends CreateDeleteEvent {

	public async handle(emoji: GuildEmoji, embed: MessageEmbed): Promise<MessageEmbed> {
		return embed
			.setColor(Colors.Pink)
			.setTitle(`Emoji Created | ${emoji.name}`);
	}

}
