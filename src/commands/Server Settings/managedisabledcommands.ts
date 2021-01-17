import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildMessage } from '@lib/types/Messages';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { ApplyOptions, CreateResolvers } from '@skyra/decorators';
import { richDisplayList } from '@utils/util';
import { MessageEmbed } from 'discord.js';
import { Command, CommandOptions, KlasaMessage } from 'klasa';

@ApplyOptions<CommandOptions>({
	aliases: ['mdc'],
	description: lang => lang.tget('commandManageDisabledCommandsDescription'),
	extendedHelp: lang => lang.tget('commandManageDisabledCommandsExtended'),
	permissionLevel: PermissionsLevels.MODERATOR,
	runIn: ['text'],
	usage: '<command:command|show>'
})
@CreateResolvers([
	[
		'command',
		(str, possible, msg) => !str || str === '' ? null : msg.client.arguments.get('command').run(str, possible, msg)
	]
])
export default class extends SteveCommand {

	public async run(msg: GuildMessage, [cmd]: [Command | 'show']) {
		const disabledCommands = (msg.guild.settings.get(GuildSettings.DisabledCommands) as string[])
			.filter(cmdName => this.store.has(cmdName));

		if (cmd === 'show') {
			if (!disabledCommands.length) return msg.channel.send(msg.guild.language.tget('commandManageDisabledCommandsNoCommandsDisabled'));

			const res = await msg.channel.send(new MessageEmbed()
				.setDescription('Loading...'));

			const display = richDisplayList(disabledCommands, 30);

			await display.run(res as KlasaMessage);
			return res;
		}

		await msg.guild.settings.update(GuildSettings.DisabledCommands, cmd.name);

		const currentlyDisabled = disabledCommands.includes(cmd.name);
		return msg.channel.send(msg.guild.language.tget('commandManageDisabledCommands', cmd.name, currentlyDisabled));
	}

}
