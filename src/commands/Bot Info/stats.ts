import { CommandOptions, KlasaMessage, Duration, version as klasaVersion } from 'klasa';
import { MessageEmbed, version as discordVersion } from 'discord.js';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<CommandOptions>({
	guarded: true,
	description: lang => lang.tget('commandStatsDescription'),
	extendedHelp: lang => lang.tget('commandStatsExtended')
})
export default class extends SteveCommand {

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

		const embedData = msg.language.tget('commandStatsEmbed');

		const embed = new MessageEmbed()
			.addFields(
				{ name: embedData.fieldTitles.memoryUsage, value: `${(memory || process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB` },
				{ name: embedData.fieldTitles.uptime, value: Duration.toNow(Date.now() - (process.uptime() * 1000)) },
				{ name: embedData.fieldTitles.users, value: (users || this.client.users.cache.size).toLocaleString() },
				{ name: embedData.fieldTitles.guilds, value: (guilds || this.client.guilds.cache.size).toLocaleString() },
				{ name: embedData.fieldTitles.channels, value: (channels || this.client.channels.cache.size).toLocaleString() },
				{ name: embedData.fieldTitles.klasa, value: `v${klasaVersion}` },
				{ name: embedData.fieldTitles.discordjs, value: `v${discordVersion}` },
				{ name: embedData.fieldTitles.node, value: process.version }
			)
			.attachFiles(['./assets/images/stats_embed_thumbnail.png'])
			.setColor(0x71adcf)
			.setFooter(embedData.footer)
			.setThumbnail('attachment://stats_embed_thumbnail.png')
			.setTimestamp()
			.setTitle(embedData.title);

		return msg.channel.send(embed);
	}

}
