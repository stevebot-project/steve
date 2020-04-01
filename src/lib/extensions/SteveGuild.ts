import { Structures } from 'discord.js';
import { MusicHandler } from '@lib/structures/music/MusicHandler';
import { ModerationManager } from '@lib/structures/moderation/ModerationManager';

export class SteveGuild extends Structures.get('Guild') {

	public readonly moderation: ModerationManager = new ModerationManager(this);
	public readonly music: MusicHandler = new MusicHandler(this);

}

Structures.extend('Guild', () => SteveGuild);
