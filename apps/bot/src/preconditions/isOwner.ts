import { LanguageKeys } from "#lib/i18n/index";
import { useT } from "#utils/i18n";
import { AllFlowsPrecondition } from "@sapphire/framework";
import { fetchT, type Target } from "@sapphire/plugin-i18next";
import { User, type CommandInteraction, type ContextMenuCommandInteraction, type Message } from "discord.js";

export default class extends AllFlowsPrecondition {
	public override async messageRun(msg: Message) {
		return this.isOwner(msg.author.id, msg);
	}

	public override async chatInputRun(interaction: CommandInteraction) {
		return this.isOwner(interaction.user.id, interaction);
	}

	public override async contextMenuRun(interaction: ContextMenuCommandInteraction) {
		return this.isOwner(interaction.user.id, interaction);
	}

	private async isOwner(user_id: string, context: Target) {
		await this.container.client.application!.fetch();
		const owner = this.container.client.application!.owner!;

		const t = useT(await fetchT(context));

		if (owner instanceof User) {
			return owner.id === user_id
				? this.ok()
				: this.error({
						message: t(LanguageKeys.Preconditions.IsOwner.NotOwner),
					});
		}

		return owner.members.has(user_id)
			? this.ok()
			: this.error({ message: t(LanguageKeys.Preconditions.IsOwner.NotOwner) });
	}
}
