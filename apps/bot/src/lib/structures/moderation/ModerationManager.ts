import { container } from "@sapphire/framework";
import { Guild, GuildMember } from "discord.js";

export default class ModerationManager {
	// @ts-ignore 6133
	private readonly guild: Guild;

	public constructor(guild: Guild) {
		this.guild = guild;
	}

	public async timeout(target: GuildMember, options: TimeoutOptions): Promise<ModerationResult> {
		const { duration, reason } = options;

		if (!target.moderatable) {
			return { success: false, error: ModerationErrors.NOT_MODERATABLE };
		}

		try {
			await target.timeout(duration, reason);
			return { success: true, member: target };
		} catch (err) {
			container.logger.error(err);
			return { success: false, error: ModerationErrors.GENERIC_FAIL };
		}
	}
}

export enum ModerationErrors {
	GENERIC_FAIL = "generic_fail",
	NOT_MODERATABLE = "not_manageable",
}

interface TimeoutOptions {
	duration: number | null;
	reason: string | undefined;
}

type ModerationResult = { success: true; member: GuildMember } | { success: false; error: ModerationErrors };
