import { MessageEmbed } from 'discord.js';
import { ApplicationCommandOptionType, InteractionType, InteractionResponseType } from './Enums';

export type AllowedMentionsTypes = 'roles' | 'users' | 'everyone';

export interface AllowedMentions {
	parse: AllowedMentionsTypes[];
	roles: string[];
	users: string[];
	replied_user: boolean;
}
export interface ApplicationCommand {
	id: string;
	application_id: string;
	name: string;
	description: string;
	options?: ApplicationCommandOption[];
}

export interface ApplicationCommandOption {
	type: ApplicationCommandOptionType;
	name: string;
	description: string;
	required?: boolean;
	choices?: ApplicationCommandOptionChoice[];
	options?: ApplicationCommandOption[];
}

export interface ApplicationCommandOptionChoice {
	name: string;
	value: string | number;
}

export interface ApplicationCommandInteractionData {
	id: string;
	name: string;
	resolved?: ApplicationCommandInteractionDataResolved;
	options?: ApplicationCommandInteractionDataOption[];
}

export interface ApplicationCommandInteractionDataResolved {
	channels?: Record<string, DiscordAPIPartialChannel>;
	members?: Record<string, DiscordAPIPartialGuildMember>;
	roles?: Record<string, DiscordAPIRole>;
	users?: Record<string, DiscordAPIUser>;
}

export interface ApplicationCommandInteractionDataOption {
	name: string;
	type: ApplicationCommandOptionType;
	value?: string | number;
	options?: ApplicationCommandInteractionDataOption[];
}

export interface DiscordAPIPartialChannel { // TODO: add permissions
	id: string;
	name: string;
	type: number;
}

export interface DiscordAPIPartialGuildMember {
	nick?: string;
	roles: string[];
	joined_at: Date;
	premium_since?: Date;
	pending?: boolean;
	permissions?: string;
	user: DiscordAPIUser;
}

export interface DiscordAPIRole {
	id: string;
	name: string;
	color: number;
	hoist: boolean;
	position: number;
	permissions: string;
	managed: boolean;
	mentionable: boolean;
}

interface DiscordAPIRoleTags {
	bot_id?: string;
	integration_id?: string;
	premium_subscriber?: null;
}

export interface DiscordAPIUser {
	id: string;
	username: string;
	discriminator: string;
	avatar?: string;
	bot?: boolean;
	system?: boolean;
	mfa_enabled?: boolean;
	locale?: string;
	verified?: boolean;
	email?: string;
	flags?: number;
	premium_type?: number;
	public_flags?: number;
}

export interface Interaction { // add member + user
	id: string;
	application_id: string;
	type: InteractionType;
	data?: ApplicationCommandInteractionData;
	guild_id?: string;
	channel_id: string;
	token: string;
	version: number;
	member?: DiscordAPIPartialGuildMember;
	user?: DiscordAPIUser;
}

export interface InteractionResponse {
	type: InteractionResponseType;
	data?: InteractionApplicationCommandCallbackResponseData;
}

export interface InteractionApplicationCommandCallbackResponseData {
	tts?: boolean;
	content?: string;
	embeds?: MessageEmbed[];
	allowed_mentions?: AllowedMentions;
	flags?: number;
}
