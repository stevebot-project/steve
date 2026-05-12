import "@kaname-png/plugin-subcommands-advanced/register";
import "@sapphire/plugin-i18next/register";
import "@sapphire/plugin-logger/register";

import { ApplicationCommandRegistries, RegisterBehavior } from "@sapphire/framework";

ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.Overwrite);
