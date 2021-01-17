import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Inhibitor, KlasaMessage } from 'klasa';

module.exports = class extends Inhibitor {

	public run(msg: KlasaMessage, cmd: SteveCommand) {
		if (!cmd.enabled) throw msg.language.tget('inhibitorDisabledGlobal');
		if (msg.guild && msg.guildSettings.get(GuildSettings.DisabledCommands).includes(cmd.name)) throw msg.language.tget('inhibitorDisabledGuild');
	}

};
