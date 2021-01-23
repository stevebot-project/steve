import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { GuildMessage } from '@lib/types/Messages';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { ApplyOptions } from '@skyra/decorators';
import { richDisplayList } from '@utils/util';
import { MessageEmbed } from 'discord.js';
import { CommandOptions, KlasaMessage } from 'klasa';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('commandShowIgnoredChannelsDescription'),
	runIn: ['text']
})
export default class extends SteveCommand {

	public async run(msg: GuildMessage) {
		const ignoredChannels = msg.guild.settings.get(GuildSettings.IgnoredChannels) as string[];
		const ignoredChannelNames: string[] = [];

		for (let i = 0; i < ignoredChannels.length; i++) {
			const channel = msg.guild.channels.cache.get(ignoredChannels[i]);
			if (!channel) continue;

			ignoredChannelNames.push(channel.name);
		}

		if (!ignoredChannelNames.length) throw msg.guild.language.tget('commandShowIgnoredChannelsNoChannels');

		const display = richDisplayList(ignoredChannelNames, 30);

		const res = await msg.channel.send(new MessageEmbed()
			.setDescription('Loading...'));

		await display.run(res as KlasaMessage);
		return res;
	}

}
