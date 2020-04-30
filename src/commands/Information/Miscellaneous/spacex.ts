import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';
import fetch from 'node-fetch';
import { Colors } from '@lib/types/enums';
import { formatDate, newEmbed } from '@utils/util';
import { Core, Launch } from '@lib/types/spacex';
const api = 'https://api.spacexdata.com/v3';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.get('COMMAND_SPACEX_DESCRIPTION'),
			examples: ['spacex launch|55', 'spacex core|B1033'],
			subcommands: true,
			usage: '<launch|core> (launchNumber:integer) (coreSerial:string)',
			helpUsage: '*launch*|number OR *core*|coreSerial'
		});

		this
			.createCustomResolver('integer', (str, possible, msg, [action]) => {
				if (action === 'core') return undefined;

				const num = parseInt(str, 10);
				if (!num) throw msg.language.get('COMMAND_SPACEX_INVALID_INT');
				return num;
			})
			.createCustomResolver('string', (str, possible, msg, [action]) => action === 'launch' ? undefined : str);
	}

	public async launch(msg: KlasaMessage, [num]: [number]): Promise<Message> {
		const res = await fetch(`${api}/launches/${num}`);
		const resJson = await res.json();
		if (resJson.error) throw msg.language.get('COMMAND_SPACEX_INVALID_LAUNCH_NUMBER');
		const launch = resJson as Launch;

		const embed = newEmbed()
			.setTitle(launch.mission_name)
			.setThumbnail(launch.links.mission_patch)
			.setColor(Colors.SpaceXBlue)
			.addFields([
				{ name: 'Rocket', value: launch.rocket.rocket_name, inline: true }
			]);

		if (launch.details !== null) embed.setDescription(launch.details);

		if (!launch.is_tentative) {
			embed
				.setFooter(`Launched from ${launch.launch_site.site_name}`)
				.setTimestamp(launch.launch_date_utc)
				.addFields([
					{ name: 'First Stage Cores', value: launch.rocket.first_stage.cores.map(core => core.core_serial).join(', '), inline: true }
				]);
		} else {
			embed
				.addFields([
					{ name: 'NET Launch Date', value: formatDate(launch.launch_date_utc) }
				]);
		}

		return msg.channel.send(embed);
	}

	public async core(msg: KlasaMessage, [num, serial]: [number, string]): Promise<Message> { // eslint-disable-line @typescript-eslint/no-unused-vars
		const res = await fetch(`${api}/cores/${serial}`);
		const resJson = await res.json();
		if (resJson.error) throw msg.language.get('COMMAND_SPACEX_INVALID_CORE_SERIAL');
		const core = resJson as Core;

		const embed = newEmbed()
			.setTitle(core.core_serial)
			.setDescription(core.details)
			.setColor(Colors.SpaceXBlue)
			.addFields([
				{ name: 'Block', value: core.block, inline: true },
				{ name: 'Status', value: core.status, inline: true },
				{ name: 'Reuse Count', value: core.reuse_count, inline: true }
			])
			.setFooter(`Originally launched on ${formatDate(core.original_launch)}`);

		if (core.reuse_count > 0) {
			embed
				.addFields([
					{ name: 'RTLS Attempts/Landings', value: `${core.rtls_attempts}/${core.rtls_landings}`, inline: true },
					{ name: 'ASDS Attempts/Landings', value: `${core.asds_attempts}/${core.asds_landings}`, inline: true }
				]);
		}

		embed
			.addFields([
				{ name: 'Missions', value: core.missions.map(mission => mission.name).join(', ') }
			]);

		return msg.channel.send(embed);
	}

}
