// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
import { Argument, KlasaMessage, Possible, util } from 'klasa';
import { Guild, GuildMember, User } from 'discord.js';

const USER_REGEXP = Argument.regex.userOrMember;

async function resolveUser(query: GuildMember | User | string, guild: Guild) {
	if (guild.memberCount > guild.members.cache.size) await guild.members.fetch();

	if (query instanceof GuildMember) return query.user;
	if (query instanceof User) return query;
	if (typeof query === 'string') {
		if (USER_REGEXP.test(query)) return guild.client.users.fetch(USER_REGEXP.exec(query)![1]).catch(() => null);
		if (/\w{1,32}#\d{4}/.test(query)) {
			const res = guild.members.cache.find(member => member.user.tag === query);
			return res ? res.user : null;
		}
	}
	return null;
}

module.exports = class extends Argument {

	public async run(arg: string, possible: Possible, msg: KlasaMessage): Promise<User> {
		if (!msg.guild) return this.store.get('user').run(arg, possible, msg);
		const resUser = await resolveUser(arg, msg.guild);
		if (resUser) return resUser;

		const results = [];
		const reg = new RegExp(util.regExpEsc(arg), 'i');
		for (const member of msg.guild.members.cache.values()) {
			if (reg.test(member.user.username)) results.push(member.user);
		}

		// eslint-disable-next-line @typescript-eslint/init-declarations
		let querySearch: User[];
		if (results.length > 0) {
			const regWord = new RegExp(`\\b${util.regExpEsc(arg)}\\b`, 'i');
			const filtered = results.filter(user => regWord.test(user.username));
			querySearch = filtered.length > 0 ? filtered : results;
		} else {
			querySearch = results;
		}

		switch (querySearch.length) {
			case 0: throw msg.language.tget('ARGUMENT_USERNAME_CANNOTFIND', possible.name);
			case 1: return querySearch[0];
			default: throw msg.language.tget('ARGUMENT_USERNAME_MULTIPLE', querySearch.map(user => user.tag).join('`, `'));
		}
	}

};
