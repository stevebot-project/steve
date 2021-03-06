import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandOptions, KlasaMessage } from 'klasa';
import { EmbedField, Message, MessageEmbed } from 'discord.js';
import { formatDate, sendLoadingMessage } from '@utils/util';
import { ApplyOptions } from '@skyra/decorators';
import axios from 'axios';
import { ImageAssets } from '@lib/types/Enums';

@ApplyOptions<CommandOptions>({
	aliases: ['ds', 'discstatus', 'isdiscordbroke'],
	cooldown: 60,
	cooldownLevel: 'channel',
	description: lang => lang.tget('commandDiscordStatusDescription')
})
export default class extends SteveCommand {

	private baseUrl = 'https://srhpyqt94yxb.statuspage.io/api/v2/summary.json';

	public async run(msg: KlasaMessage): Promise<Message> {
		const embedData = msg.language.tget('commandDiscordStatusEmbed');

		const response = await sendLoadingMessage(msg);

		const { data: currentStatus, statusText } = await axios.get<DiscordStatus>(this.baseUrl);

		if (statusText !== 'OK') {
			return response.edit(msg.language.tget('commandDiscordStatusError'));
		}

		const fields: EmbedField[] = [];

		if (currentStatus.components?.every(component => component.status === 'operational')) {
			fields.push({
				name: embedData.fields.operational.title,
				value: embedData.fields.operational.value,
				inline: false
			});
		} else {
			currentStatus.components.forEach(component => {
				if (component.status !== 'operational') {
					fields.push({
						name: component.name,
						value: component.status,
						inline: true
					});
				}
			});
		}

		if (currentStatus.scheduled_maintenances.length > 0) {
			fields.push({
				name: embedData.fields.maintenance.title,
				value: currentStatus.scheduled_maintenances.map(m => embedData.fields.maintenance.value(m.name, m.impact)).join('\n'),
				inline: false
			});
		}

		const embed = new MessageEmbed()
			.setTitle(currentStatus.status.description)
			.setDescription(embedData.description(currentStatus.incidents[0]
				? currentStatus.incidents.map(i => i.name).join('\n')
				: embedData.noIncidents))
			.addFields(fields)
			.setThumbnail(ImageAssets.DiscordLogo)
			.setTimestamp()
			.setFooter(embedData.footer(formatDate(new Date(currentStatus.page.updated_at))))
			.setColor('BLURPLE');

		return response.edit(undefined, embed);

	}

}

interface DiscordStatus {
	page: Page;
	status: Status;
	components: ComponentsEntity[];
	incidents: IncidentsEntity[];
	scheduled_maintenances: ScheduledMaintenancesEntity[];
}
interface Page {
	id: string;
	name: string;
	url: string;
	updated_at: string;
}
interface Status {
	description: string;
	indicator: string;
}
interface ComponentsEntity {
	created_at: string;
	description?: string | null;
	id: string;
	name: string;
	page_id: string;
	position: number;
	status: string;
	updated_at: string;
	only_show_if_degraded: boolean;
}
interface IncidentsEntity {
	created_at: string;
	id: string;
	impact: string;
	incident_updates?: IncidentUpdatesEntity[] | null;
	monitoring_at?: null;
	name: string;
	page_id: string;
	resolved_at?: null;
	shortlink: string;
	status: string;
	updated_at: string;
}
interface IncidentUpdatesEntity {
	body: string;
	created_at: string;
	display_at: string;
	id: string;
	incident_id: string;
	status: string;
	updated_at: string;
}
interface ScheduledMaintenancesEntity {
	created_at: string;
	id: string;
	impact: string;
	incident_updates?: IncidentUpdatesEntity[] | null;
	monitoring_at?: null;
	name: string;
	page_id: string;
	resolved_at?: null;
	scheduled_for: string;
	scheduled_until: string;
	shortlink: string;
	status: string;
	updated_at: string;
}
