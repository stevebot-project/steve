import { MessageEmbed } from 'discord.js';

export type AllowedMentionsTypes = 'roles' | 'users' | 'everyone';
export type ConvertApplicationCommandSubcommand = 'temperature' | 'length' | 'mass';

export interface AllowedMentions {
	parse: AllowedMentionsTypes[];
	roles: string[];
	users: string[];
	replied_user: boolean;
}

export interface InteractionCreatePacket {
	version: number;
	type: number;
	token: string;
	member: InteractionCreatePacketMember;
	id: string;
	guild_id: string;
	data: InteractionCreatePacketData;
	channel_id: string;
}

export interface InteractionCreatePacketData {
	resolved: {
		members?: Record<string, InteractionCreatePacketMember>;
		roles?: Record<string, InteractionResolvedRole>;
		users?: Record<string, InteractionCreatePacketMemberUser>;
	};
	options: InteractionCreatePacketDataOptions[];
	name: string;
	id: string;
}

export interface InteractionCreatePacketDataOptions {
	name: string;
	value: string;
	options: { value: string | number | boolean; type: number; name: string }[];
}

export interface InteractionCreatePacketMember {
	user: InteractionCreatePacketMemberUser;
	roles: string[];
	premium_since: Date | null;
	permissions: string;
	pending: boolean;
	nick: string;
	mute: boolean;
	joined_at: Date;
	is_pending: false;
	deaf: boolean;
}

export interface InteractionCreatePacketMemberUser {
	id: string;
	username: string;
	avatar: string;
	discriminator: string;
	public_flags: number;
}

export interface InteractionResolvedRole {
	position: number;
	permissions: string;
	name: string;
	mentionable: boolean;
	managed: boolean;
	id: string;
	hoist: string;
	color: number;
}

export interface InteractionResponseData {
	tts?: boolean;
	content?: string;
	embeds?: MessageEmbed[];
	allowed_mentions?: AllowedMentions;
	flags?: number;
}


