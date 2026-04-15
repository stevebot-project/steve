import "#lib/setup/setup";
import "dotenv/config";

import { SteveClient } from "#lib/SteveClient";
import { container } from "@sapphire/framework";

const client = new SteveClient();

async function steve() {
	try {
		await client.login();
	} catch (err) {
		container.logger.error(err);
	}
}

steve().catch(container.logger.error.bind(container.logger));
