import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { GuildMessage } from '@lib/types/Messages';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { ApplyOptions } from '@skyra/decorators';
import { richDisplayList } from '@utils/util';
import { MessageEmbed } from 'discord.js';
import { CommandOptions, KlasaMessage } from 'klasa';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('commandShowIgnoredRolesDescription'),
	runIn: ['text']
})
export default class extends SteveCommand {

	public async run(msg: GuildMessage) {
		const ignoredRoles = msg.guild.settings.get(GuildSettings.IgnoredRoles) as string[];
		const ignoredRoleNames: string[] = [];

		for (let i = 0; i < ignoredRoles.length; i++) {
			const role = msg.guild.roles.cache.get(ignoredRoles[i]);
			if (!role) continue;

			ignoredRoleNames.push(role.name);
		}

		if (!ignoredRoleNames.length) throw msg.guild.language.tget('commandShowIgnoredRolesNoRoles');

		const display = richDisplayList(ignoredRoleNames, 30);

		const res = await msg.channel.send(new MessageEmbed()
			.setDescription('Loading...'));

		await display.run(res as KlasaMessage);
		return res;
	}

}
