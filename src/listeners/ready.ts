import { ApplyOptions } from "@sapphire/decorators";
import { Listener } from "@sapphire/framework";
import type { Client } from "discord.js";

@ApplyOptions<Listener.Options>({ once: true })
export default class extends Listener {
	public run(client: Client) {
		const { username, id } = client.user!;

		console.log(`Logged in and ready as ${username} (${id})!`);
	}
}
