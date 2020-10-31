import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message, MessageEmbed } from 'discord.js';
import { formatDate } from '@utils/util';
import fetch from 'node-fetch';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['ds', 'discstatus', 'isdiscordbroke'],
			cooldown: 60,
			cooldownLevel: 'channel',
			description: lang => lang.tget('COMMAND_DISCORD_STAUTS_DECRIPTION')
		});
	}

	public async run(msg: KlasaMessage): Promise<Message> {
		const url = 'https://srhpyqt94yxb.statuspage.io/api/v2/summary.json';

		return fetch(url, { method: 'Get' })
			.then(res => res.json())
			.then(json => {
				const embed = new MessageEmbed()
					.setTitle(json.status.description)
					.setDescription(msg.language.tget('COMMAND_DISCORD_STAUTS_EMBED_DECRIPTION', json.status.indicator))
					.addFields(json.components.map((component: { name: any; status: any }) => ({
						name: component.name,
						value: component.status,
						inline: true
					})))
					.setFooter(msg.language.tget('COMMAND_DISCORD_STATUS_EMBED_FOOTER', formatDate(json.page.updated_at)));

				return msg.channel.send(embed);
			});
	}

}
