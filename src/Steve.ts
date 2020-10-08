import 'module-alias/register';
import { TOKENS, CLIENT_OPTIONS } from '@root/config';

import { SteveClient } from '@lib/SteveClient';

const bot = new SteveClient(CLIENT_OPTIONS);

bot.login(TOKENS.BOT_TOKEN).catch(e => console.error(e));
