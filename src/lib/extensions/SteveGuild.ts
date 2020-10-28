/* eslint-disable @typescript-eslint/no-invalid-this */
import { Structures } from 'discord.js';
import { ModerationManager } from '@lib/structures/ModerationManager';

export class SteveGuild extends Structures.get('Guild') {

	public readonly moderation: ModerationManager = new ModerationManager(this);

}

Structures.extend('Guild', () => SteveGuild);
