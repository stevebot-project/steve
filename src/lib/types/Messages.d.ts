import { KlasaMessage } from 'klasa';
import { Guild, GuildMember, NewsChannel, TextChannel } from 'discord.js';

export interface GuildMessage extends KlasaMessage {
	channel: TextChannel | NewsChannel;
	readonly guild: Guild;
	readonly member: GuildMember;
}
