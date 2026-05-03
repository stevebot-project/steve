import {
	Listener,
	MessageCommandDeniedPayload,
	UserError,
} from "@sapphire/framework";

export default class extends Listener {
	public run(error: UserError, { message }: MessageCommandDeniedPayload) {
		return message.reply(error.message);
	}
}
