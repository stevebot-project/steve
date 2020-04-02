import { Snowflake, User, Util } from 'discord.js';
import { Track } from 'lavalink';
import { MusicHandler } from './MusicHandler';
import { friendlyColonDuration } from '@utils/util';

export class Song {

	public author: string;
	public duration: number;
	public handler: MusicHandler;
	public requester: Snowflake;
	public skips = new Set<Snowflake>();
	public title: string;
	public track: string;
	public url: string;

	public constructor(handler: MusicHandler, track: Track, requester: Snowflake) {
		this.author = track.info.author;
		this.duration = track.info.length;
		this.handler = handler;
		this.requester = requester;
		this.title = track.info.title;
		this.track = track.track;
		this.url = track.info.uri;
	}

	public get friendlyDuration(): string {
		return friendlyColonDuration(this.duration);
	}

	public get safeTitle(): string {
		let { title } = this;
		title = Util.removeMentions(title);
		title = Util.escapeMarkdown(title);
		return title;
	}

	public fetchRequester(): Promise<User> {
		return this.handler.client.users.fetch(this.requester);
	}

}
