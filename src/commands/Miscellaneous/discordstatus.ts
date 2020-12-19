import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandOptions, KlasaMessage } from 'klasa';
import { Message, MessageEmbed } from 'discord.js';
import { formatDate } from '@utils/util';
import fetch from 'node-fetch';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<CommandOptions>({
	aliases: ['ds', 'discstatus', 'isdiscordbroke'],
	cooldown: 60,
	cooldownLevel: 'channel',
	description: lang => lang.tget('COMMAND_DISCORD_STATUS_DESCRIPTION')
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage): Promise<Message> {
		const url = 'https://srhpyqt94yxb.statuspage.io/api/v2/summary.json';
		const EMBED_DATA = msg.language.tget('COMMAND_DISCORD_STAUTS_EMBED');

		return fetch(url, { method: 'Get' })
			.then(res => res.json())
			.then(json => {
				const embed = new MessageEmbed()
					.setTitle(json.status.description)
					.setDescription(EMBED_DATA.DECRIPTION(json.status.indicator))
					.addFields(json.components.map((component: { name: any; status: any }) => ({
						name: component.name,
						value: component.status,
						inline: true
					})))
					.setFooter(EMBED_DATA.FOOTER(formatDate(json.page.updated_at)));

				return msg.channel.send(embed);
			})
			.catch(err => {
				console.log(err);
				return msg.sendLocale('COMMAND_DISCORD_STATUS_ERROR');
			});
	}

}
