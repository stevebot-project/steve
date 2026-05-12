import { LanguageKeys } from "#lib/i18n/index";
import { SteveT, useT } from "#utils/i18n";
import { Args, Command, CommandOptions } from "@sapphire/framework";
import { fetchT, Target } from "@sapphire/plugin-i18next";
import {
	ChatInputCommandInteraction,
	ContextMenuCommandInteraction,
	Message,
	MessageContextMenuCommandInteraction,
	UserContextMenuCommandInteraction,
} from "discord.js";

export interface SteveCommandOptions extends CommandOptions {
	guildOnly?: boolean;
	shouldDefer?: boolean;
}

export type GuildSlashCommandInteraction = ChatInputCommandInteraction<"cached">;
export type GuildUserMenuCommandInteraction = UserContextMenuCommandInteraction<"cached">;
export type GuildMessageMenuCommandInteraction = MessageContextMenuCommandInteraction<"cached">;

export abstract class SteveCommand extends Command {
	public readonly guildOnly: boolean;
	public readonly shouldDefer: boolean;

	public constructor(context: Command.LoaderContext, options: SteveCommandOptions) {
		super(context, options);

		this.guildOnly = options.guildOnly ?? false;
		this.shouldDefer = options.shouldDefer ?? false;
	}

	public override async chatInputRun(interaction: ChatInputCommandInteraction) {
		if (this.shouldDefer) await interaction.deferReply();

		const t = await this.fetchSteveT(interaction);

		if (this.guildOnly && !interaction.inCachedGuild()) {
			return this.shouldDefer
				? interaction.editReply(t(LanguageKeys.General.Errors.NotInCachedGuild))
				: interaction.reply(t(LanguageKeys.General.Errors.NotInCachedGuild));
		}

		return this.slashRun(interaction, t);
	}

	public override async contextMenuRun(interaction: ContextMenuCommandInteraction) {
		const t = await this.fetchSteveT(interaction);

		if (this.guildOnly && !interaction.inCachedGuild()) {
			return interaction.reply(t(LanguageKeys.General.Errors.NotInCachedGuild));
		}

		return this.menuRun(interaction, t);
	}

	public override async messageRun(msg: Message, args: Args) {
		const t = await this.fetchSteveT(msg);

		return this.textRun(msg, args, t);
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	public async menuRun(_interaction: ContextMenuCommandInteraction, _t: SteveT): Promise<unknown> {
		return undefined;
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	public async slashRun(_interaction: ChatInputCommandInteraction, _t: SteveT): Promise<unknown> {
		return undefined;
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	public async textRun(_message: Message, _args: Args, _t: SteveT): Promise<unknown> {
		return undefined;
	}

	private async fetchSteveT(target: Target) {
		return useT(await fetchT(target));
	}
}
