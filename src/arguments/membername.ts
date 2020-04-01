// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
import { Argument, util, Possible, KlasaMessage } from 'klasa';
import { GuildMember, User, Guild } from 'discord.js';

const USER_REGEXP = Argument.regex.userOrMember;

function resolveMember(query: GuildMember | User | string, guild: Guild): Promise<GuildMember> | GuildMember | null {
	if (query instanceof GuildMember) return query;
	if (query instanceof User) return guild.members.fetch(query.id);
	if (typeof query === 'string') {
		if (USER_REGEXP.test(query)) return guild.members.fetch(USER_REGEXP.exec(query)[1]).catch(() => null);
		if (/\w{1,32}#\d{4}/.test(query)) {
			const res = guild.members.cache.find(member => member.user.tag.toLowerCase() === query.toLowerCase());
			return res || null;
		}
	}
	return null;
}

export default class extends Argument {

	public async run(arg: string, possible: Possible, msg: KlasaMessage): Promise<GuildMember> {
		if (!msg.guild) throw 'This command can only be used inside a guild.';
		const resUser = await resolveMember(arg, msg.guild);
		if (resUser) return resUser;

		const results = [];
		const reg = new RegExp(util.regExpEsc(arg), 'i');
		for (const member of msg.guild.members.cache.values()) {
			if (reg.test(member.user.username)) results.push(member);
		}

		let querySearch;
		if (results.length > 0) {
			const regWord = new RegExp(`\\b${util.regExpEsc(arg)}\\b`, 'i');
			const filtered = results.filter(member => regWord.test(member.user.username));
			querySearch = filtered.length > 0 ? filtered : results;
		} else {
			querySearch = results;
		}

		switch (querySearch.length) {
			case 0: throw `${possible.name} must be a valid name, id or user mention`;
			case 1: return querySearch[0];
			default: throw `Found multiple matches: \`${querySearch.map(member => member.user.tag).join('`, `')}\``;
		}
	}

}
