import { CreateDeleteEvent } from '@lib/structures/events/CreateDeleteEvent';
import { Role, MessageEmbed } from 'discord.js';
import { Colors } from '@lib/types/enums';

export default class extends CreateDeleteEvent {

	public async handle(role: Role, embed: MessageEmbed): Promise<MessageEmbed> {
		return embed
			.setColor(Colors.Yellow)
			.setTitle(`Role Deleted | ${role.name}`);
	}

}
