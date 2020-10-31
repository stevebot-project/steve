import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message, MessageEmbed } from 'discord.js';
import { formatDate } from '@utils/util';
import fetch from 'node-fetch'

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['ds', 'discstatus', 'isdiscordbroke'],
			cooldown: 60,
			cooldownLevel: 'channel',
			description: 'See the current status of Discord'
		});
	}

	public async run(msg: KlasaMessage): Promise<Message> {
		const url = 'https://srhpyqt94yxb.statuspage.io/api/v2/summary.json';

		return fetch(url, { method: "Get" })
			.then(res => res.json())
			.then((json) => {
				const embed = new MessageEmbed()
				.setTitle(json.status.description)
				.setDescription(`[Discord Status](https://discordstatus.com/)\n**Current Incident:**\n${json.status.indicator}`)
				.addFields(json.components.map((component: { name: any; status: any; }) => ({
					name: component.name,
					value: component.status,
					inline: true
				})))
				.setTimestamp()
				.setFooter(`Last changed: ${formatDate(json.page.updated_at)}`);

			return msg.channel.send(embed);
			});
	}

}
