import "#lib/setup/setup";
import "dotenv/config";

import { SteveClient } from "#lib/SteveClient";
import { container } from "@sapphire/framework";

const client = new SteveClient();

async function steve() {
	await client.login();
}

process.on("unhandledRejection", (error) => {
	container.logger.error(error);
});

steve().catch(container.logger.error.bind(container.logger));
