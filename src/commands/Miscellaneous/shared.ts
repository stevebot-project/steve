import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { ApplyOptions } from '@skyra/decorators';
import { CommandOptions, KlasaMessage } from 'klasa';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('commandSharedDescription'),
	extendedHelp: lang => lang.tget('commandSharedExtended')
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage) {
		const sharedGuilds = this.client.guilds.cache.filter(guild => guild.members.cache.has(msg.author.id));

		return msg.channel.send(msg.language.tget('commandShared', sharedGuilds));
	}

}
