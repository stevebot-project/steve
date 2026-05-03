import { LanguageKeys } from "#lib/i18n/index";
import { useT } from "#utils/i18n";
import { AllFlowsPrecondition } from "@sapphire/framework";
import { fetchT } from "@sapphire/plugin-i18next";
import {
	ChatInputCommandInteraction,
	ContextMenuCommandInteraction,
	GuildMember,
	Message,
	PermissionFlagsBits,
} from "discord.js";

export default class extends AllFlowsPrecondition {
	public override async messageRun(msg: Message) {
		const t = useT(await fetchT(msg));

		if (!msg.member)
			return this.error({
				message: t(LanguageKeys.Preconditions.IsModerator.NotInGuild),
			});

		return this.isModerator(msg.member, t);
	}

	public override async chatInputRun(interaction: ChatInputCommandInteraction) {
		const t = useT(await fetchT(interaction));

		if (!interaction.inCachedGuild()) {
			return this.error({
				message: t(LanguageKeys.Preconditions.IsModerator.NotInGuild),
			});
		}

		return this.isModerator(interaction.member, t);
	}

	public override async contextMenuRun(
		interaction: ContextMenuCommandInteraction,
	) {
		const t = useT(await fetchT(interaction));

		if (!interaction.inCachedGuild()) {
			return this.error({
				message: t(LanguageKeys.Preconditions.IsModerator.NotInGuild),
			});
		}

		return this.isModerator(interaction.member, t);
	}

	private async isModerator(member: GuildMember, t: ReturnType<typeof useT>) {
		const guildSettings = await this.container.settings.guilds.getGuild(
			member.guild.id,
		);

		if (guildSettings) {
			if (
				guildSettings.roleAdministrator &&
				member.roles.cache.has(guildSettings.roleAdministrator)
			) {
				return this.ok();
			}

			if (
				guildSettings.roleModerator &&
				member.roles.cache.has(guildSettings.roleModerator)
			) {
				return this.ok();
			}
		}

		if (member.permissions.has(PermissionFlagsBits.Administrator)) {
			return this.ok();
		}

		return this.error({
			message: t(LanguageKeys.Preconditions.IsModerator.NotModerator),
		});
	}
}
