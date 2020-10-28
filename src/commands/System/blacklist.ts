
import { CommandStore, KlasaMessage } from 'klasa';
import { Guild, User } from 'discord.js';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';

export default class extends SteveCommand {

	public terms: string[];

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.tget('COMMAND_BLACKLIST_DESCRIPTION'),
			guarded: true,
			permissionLevel: PermissionsLevels.OWNER,
			usage: '<User:user|Guild:guild|guild:string> [...]'
		});

		this.terms = ['usersAdded', 'usersRemoved', 'guildsAdded', 'guildsRemoved'];
	}

	 public async run(msg: KlasaMessage, usersAndGuilds: Array<User | Guild>) {
		const changes = [[], [], [], []];
		const queries = [[], []];

		for (const userOrGuild of new Set(usersAndGuilds)) {
			const type = userOrGuild instanceof User ? 'user' : 'guild';
			if (this.client.settings!.get(`${type}Blacklist`).includes(userOrGuild.id || userOrGuild)) {
				// @ts-expect-error 2339 2345
				changes[this.terms.indexOf(`${type}sRemoved`)].push(userOrGuild.name || userOrGuild.username || userOrGuild);
			} else {
				// @ts-expect-error 2339 2345
				changes[this.terms.indexOf(`${type}sAdded`)].push(userOrGuild.name || userOrGuild.username || userOrGuild);
			}
			// @ts-expect-error 2345
			queries[Number(type === 'guild')].push(userOrGuild.id || userOrGuild);
		}

		const { errors } = await this.client.settings!.update([['userBlacklist', queries[0]], ['guildBlacklist', queries[1]]]);
		if (errors.length) throw String(errors[0]);

		return msg.sendLocale('COMMAND_BLACKLIST_SUCCESS', changes);
	}

}
