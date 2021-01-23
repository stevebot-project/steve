import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildMessage } from '@lib/types/Messages';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { ApplyOptions, CreateResolvers } from '@skyra/decorators';
import { GuildChannel, TextChannel } from 'discord.js';
import { CommandOptions } from 'klasa';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('commandIgnoreChannelDescription'),
	extendedHelp: lang => lang.tget('commandIgnoreChannelExtended'),
	permissionLevel: PermissionsLevels.MODERATOR,
	runIn: ['text'],
	usage: '<channel:channel>'
})
@CreateResolvers([
	[
		'channel',
		async (str, possible, msg) => {
			const channel = await msg.client.arguments.get('channel').run(str, possible, msg) as GuildChannel;
			if (channel.type !== 'text') throw msg.guild!.language.tget('commandIgnoreChannelTextChannelRequired');

			const ignoredChannels = msg.guild!.settings.get(GuildSettings.IgnoredChannels) as string[];
			if (ignoredChannels.includes(channel.id)) throw msg.guild!.language.tget('commandIgnoreChannelAlreadyIgnored', channel.id);

			return channel as TextChannel;
		}
	]
])
export default class extends SteveCommand {

	public async run(msg: GuildMessage, [channel]: [TextChannel]) {
		await msg.guild.settings.update(GuildSettings.IgnoredChannels, channel.id, { action: 'add' });

		return msg.channel.send(msg.guild.language.tget('commandIgnoreChannel', channel.id));
	}

}
