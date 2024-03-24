import SteveClient from "#lib/SteveClient";
import { Tokens } from "#root/config";

import "@sapphire/plugin-i18next/register";

const steve = new SteveClient();

steve.login(Tokens.BotToken).catch((err) => console.error(err));
