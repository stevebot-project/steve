/* eslint-disable @typescript-eslint/no-namespace */

export namespace GuildSettings {

	export const DisabledCommands = 'disabledCommands';
	export const DisableNaturalPrefix = 'disableNaturalPrefix';
	export const Language = 'language';
	export const Prefix = 'prefix';

	export namespace Roles {
		export const Administrator = 'roles.administrator';
		export const Moderator = 'roles.moderator';
		export const Trusted = 'roles.trusted';
		export const GiveTrustedRoleOn = 'roles.giveTrustedRoleOn';
	}
}
