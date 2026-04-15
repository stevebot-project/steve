import { AllFlowsPrecondition } from "@sapphire/framework";
import { resolveKey, type Target } from "@sapphire/plugin-i18next";
import {
	User,
	type CommandInteraction,
	type ContextMenuCommandInteraction,
	type Message,
} from "discord.js";

export default class extends AllFlowsPrecondition {
	public override async messageRun(msg: Message) {
		return this.isOwner(msg.author.id, msg);
	}

	public override async chatInputRun(interaction: CommandInteraction) {
		return this.isOwner(interaction.user.id, interaction);
	}

	public override async contextMenuRun(
		interaction: ContextMenuCommandInteraction,
	) {
		return this.isOwner(interaction.user.id, interaction);
	}

	private async isOwner(user_id: string, context: Target) {
		await this.container.client.application!.fetch();
		const owner = this.container.client.application!.owner!;

		if (owner instanceof User) {
			return owner.id === user_id
				? this.ok()
				: this.error({
						message: (await resolveKey(
							context,
							"preconditions/isOwner:error_msg",
						)) as string,
					});
		}
		return owner.members.has(user_id)
			? this.ok()
			: this.error({
					message: (await resolveKey(
						context,
						"preconditions/isOwner:error_msg",
					)) as string,
				});
	}
}
