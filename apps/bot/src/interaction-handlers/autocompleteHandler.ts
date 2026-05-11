import { SteveGuild } from "#lib/structures/SteveGuild";
import { ApplyOptions } from "@sapphire/decorators";
import {
	InteractionHandler,
	InteractionHandlerOptions,
	InteractionHandlerParseResult,
	InteractionHandlerTypes,
} from "@sapphire/framework";
import { AutocompleteInteraction } from "discord.js";

@ApplyOptions<InteractionHandlerOptions>({
	interactionHandlerType: InteractionHandlerTypes.Autocomplete,
})
export class AutocompleteHandler extends InteractionHandler {
	public override async run(
		interaction: AutocompleteInteraction,
		result: InteractionHandlerParseResult<this>,
	) {
		return interaction.respond(result);
	}

	public override async parse(interaction: AutocompleteInteraction) {
		if (!interaction.inCachedGuild()) return this.none();

		if (
			interaction.commandName === "assign" ||
			interaction.commandName === "assign-manage"
		) {
			return this.assignRoleNameAutocomplete(interaction);
		}

		if (
			interaction.commandName === "snippet" ||
			interaction.commandName === "snippets-manage"
		) {
			return this.snippetNameAutocomplete(interaction);
		}

		return this.none();
	}

	private async assignRoleNameAutocomplete(
		interaction: AutocompleteInteraction<"cached">,
	) {
		const query = interaction.options.getFocused();
		const guild = await SteveGuild.get(interaction.guild);
		const assignableRoles = guild.settings!.roleAssignable;

		const response = interaction.guild.roles.cache
			.filter((r) => assignableRoles.includes(r.id))
			.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()))
			.map((r) => ({ name: r.name, value: r.name }))
			.slice(0, 25);

		return this.some(response);
	}

	private async snippetNameAutocomplete(
		interaction: AutocompleteInteraction<"cached">,
	) {
		const query = interaction.options.getFocused();

		const snippets = query
			? await this.container.settings.snippets.searchSnippetsByName(
					interaction.guildId,
					query,
				)
			: await this.container.settings.snippets.getGuildSnippets(
					interaction.guildId,
				);

		const response = snippets
			.map((snippet) => ({
				name: snippet.name,
				value: snippet.name,
			}))
			.slice(0, 25);

		return this.some(response);
	}
}
