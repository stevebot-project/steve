import { CommandStore, KlasaMessage, Duration, version as klasaVersion } from 'klasa';
import { MessageEmbed, version as discordVersion } from 'discord.js';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			guarded: true,
			description: lang => lang.tget('COMMAND_STATS_DESCRIPTION'),
			extendedHelp: lang => lang.tget('COMMAND_STATS_EXTENDED')
		});
	}

	public async run(msg: KlasaMessage) {
		let [users, guilds, channels, memory] = [0, 0, 0, 0];

		if (this.client.shard) {
			const results = await this.client.shard.broadcastEval(`[this.users.cache.size, this.guilds.cache.size, this.channels.cache.size, (process.memoryUsage().heapUsed / 1024 / 1024)]`);
			for (const result of results) {
				users += result[0];
				guilds += result[1];
				channels += result[2];
				memory += result[3];
			}
		}

		const EMBED_DATA = msg.language.tget('COMMAND_STATS_EMBED');

		const embed = new MessageEmbed()
			.addFields(
				{ name: EMBED_DATA.FIELD_TITLES.MEMORY_USAGE, value: `${(memory || process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
				{ name: EMBED_DATA.FIELD_TITLES.UPTIME, value: Duration.toNow(Date.now() - (process.uptime() * 1000)), inline: true },
				{ name: EMBED_DATA.FIELD_TITLES.USERS, value: (users || this.client.users.cache.size).toLocaleString(), inline: true },
				{ name: EMBED_DATA.FIELD_TITLES.GUILDS, value: (guilds || this.client.guilds.cache.size).toLocaleString(), inline: true },
				{ name: EMBED_DATA.FIELD_TITLES.CHANNELS, value: (channels || this.client.channels.cache.size).toLocaleString(), inline: true },
				{ name: EMBED_DATA.FIELD_TITLES.KLASA, value: `v${klasaVersion}`, inline: true },
				{ name: EMBED_DATA.FIELD_TITLES.DISCORDJS, value: `v${discordVersion}`, inline: true },
				{ name: EMBED_DATA.FIELD_TITLES.NODE, value: process.version, inline: true }
			)
			.attachFiles(['./assets/images/stats_embed_thumbnail.png'])
			.setColor(0x71adcf)
			.setFooter(EMBED_DATA.FOOTER)
			.setThumbnail('attachment://stats_embed_thumbnail.png')
			.setTimestamp()
			.setTitle(EMBED_DATA.TITLE);

		return msg.channel.send(embed);
	}

}
