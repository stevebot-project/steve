/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();
require('module-alias/register');

import { SteveClient } from '@lib/SteveClient';

const steve = new SteveClient();

void steve.login(steve.production ? process.env.DISCORD_TOKEN_PROD : process.env.DISCORD_TOKEN_DEV);
