import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildMessage } from '@lib/types/Messages';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { ApplyOptions } from '@skyra/decorators';
import { Message } from 'discord.js';
import { CommandOptions } from 'klasa';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('commandSetBanDeleteDaysDescription'),
	extendedHelp: lang => lang.tget('commandSetBanDeleteDaysExtended'),
	permissionLevel: PermissionsLevels.MODERATOR,
	runIn: ['text'],
	usage: '<days:integer{0,14}>'
})
export default class extends SteveCommand {

	public async run(msg: GuildMessage, [days]: [number]): Promise<Message> {
		await msg.guild.settings.update(GuildSettings.Moderation.BanDeleteDays, days);

		return msg.channel.send(msg.guild.language.tget('commandSetBanDeleteDaysSet', days));
	}

}
