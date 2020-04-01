// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Argument, util, Possible, KlasaMessage } from 'klasa';
import { Channel, Message, Guild } from 'discord.js';

const CHANNEL_REGEXP = Argument.regex.channel;

function resolveChannel(query, guild: Guild) {
	if (query instanceof Channel) return guild.channels.cache.has(query.id) ? query : null;
	if (query instanceof Message) return query.guild.id === guild.id ? query.channel : null;
	if (typeof query === 'string' && CHANNEL_REGEXP.test(query)) return guild.channels.cache.get(CHANNEL_REGEXP.exec(query)[1]);
	return null;
}

module.exports = class extends Argument {

	public async run(arg: string, possible: Possible, msg: KlasaMessage) {
		if (!msg.guild) return this.store.get('channel').run(arg, possible, msg);
		const resChannel = resolveChannel(arg, msg.guild);
		if (resChannel) return resChannel;

		const results = [];
		const reg = new RegExp(util.regExpEsc(arg), 'i');
		for (const channel of msg.guild.channels.cache.values()) {
			if (reg.test(channel.name)) results.push(channel);
		}

		let querySearch;
		if (results.length > 0) {
			const regWord = new RegExp(`\\b${util.regExpEsc(arg)}\\b`, 'i');
			const filtered = results.filter(channel => regWord.test(channel.name));
			querySearch = filtered.length > 0 ? filtered : results;
		} else {
			querySearch = results;
		}

		switch (querySearch.length) {
			case 0: throw `${possible.name} Must be a valid name, id or channel mention`;
			case 1: return querySearch[0];
			default: throw `Found multiple matches: \`${querySearch.map(channel => channel.name).join('`, `')}\``;
		}
	}

};
