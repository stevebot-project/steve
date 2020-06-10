/* eslint-disable @typescript-eslint/no-namespace */

export namespace GuildSettings {

	export const DisabledCommands = 'disabledCommands';
	export const DisableNaturalPrefix = 'disableNaturalPrefix';
	export const Language = 'language';
	export const Prefix = 'prefix';

	export namespace Moderation {
		export const BanDeleteDays = 'moderation.banDeleteDays';
		export const Cases = 'moderation.cases';
	}

	export namespace Roles {
		export const Administrator = 'roles.administrator';
		export const Deafened = 'roles.deafened';
		export const Moderator = 'roles.moderator';
		export const Muted = 'roles.muted';
		export const Trusted = 'roles.trusted';
		export const GiveTrustedRoleOn = 'roles.giveTrustedRoleOn';
	}
}
