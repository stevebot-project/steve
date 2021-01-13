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
	description: lang => lang.tget('commandDiscordStatusDescription')
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage): Promise<Message> {
		const url = 'https://srhpyqt94yxb.statuspage.io/api/v2/summary.json';
		const embedData = msg.language.tget('commandDiscordStautsEmbed');

		return fetch(url, { method: 'Get' })
			.then(res => res.json())
			.then(json => {
				const embed = new MessageEmbed()
					.setTitle(json.status.description)
					.setDescription(embedData.decription(json.status.indicator))
					.addFields(json.components.map((component: { name: any; status: any }) => ({
						name: component.name,
						value: component.status,
						inline: true
					})))
					.setFooter(embedData.footer(formatDate(json.page.updated_at)));

				return msg.channel.send(embed);
			})
			.catch(err => {
				console.log(err);
				return msg.sendLocale('commandDiscordStatusError');
			});
	}

}
