import { SapphireClient } from "@sapphire/framework";
import { BotOptions, Tokens } from "#root/config";

import "@sapphire/plugin-i18next/register";

const steve = new SapphireClient(BotOptions);

steve.login(Tokens.BotToken).catch((err) => console.error(err));
