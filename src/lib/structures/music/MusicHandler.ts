import { SteveClient } from '@lib/SteveClient';
import { Song } from '@lib/structures/music/Song';
import { Events, Colors, Emojis } from '@lib/types/enums';
import { Guild, VoiceChannel, TextChannel, Snowflake, Message } from 'discord.js';
import { Player, Status, LoadType } from 'lavalink';
import { KlasaMessage } from 'klasa';
import { newEmbed } from '@utils/util';

export class MusicHandler {

	public channelID: Snowflake | null = null;
	public client: SteveClient;
	public guild: Guild;
	public replay: boolean;
	public song: Song | null = null;
	public queue: Song[] = [];
	public volume = 100;

	public get canPlay(): boolean {
		return Boolean(this.song || this.queue.length);
	}

	public get player(): Player {
		return this.client.lavalink.players.get(this.guild.id);
	}

	public get playing(): boolean {
		return this.player.status === Status.PLAYING;
	}

	public get paused(): boolean {
		return this.player.status === Status.PAUSED;
	}

	public get voiceChannel(): VoiceChannel {
		return this.guild.me.voice.channel;
	}

	public get textChannel(): TextChannel {
		return (this.channelID && this.guild.channels.cache.get(this.channelID) as TextChannel) || null;
	}

	public get listeners(): readonly string[] {
		const { voiceChannel } = this;
		if (voiceChannel) {
			const members: string[] = [];
			for (const [id, member] of voiceChannel.members) {
				if (member.user.bot || member.voice.deaf) continue;
				members.push(id);
			}
			return members;
		}
		return [];
	}

	public constructor(guild: Guild) {
		this.client = guild.client as SteveClient;
		this.guild = guild;
		this.volume = 100;
	}

	public async fetch(search: string, requester: Snowflake): Promise<Song> {
		const res = await this.client.lavalink.load(`ytsearch:${search}`);
		if (res.loadType === LoadType.NO_MATCHES) throw `${Emojis.RedX} Couldn't find a YouTube video to match that search.`;
		if (res.loadType === LoadType.LOAD_FAILED) throw `${Emojis.RedX} Failed to load search results, try again.`;

		const track = res.tracks[0];
		return new Song(this, track, requester);
	}

	public add(song: Song, channel: TextChannel): Promise<Message> {
		this.queue.push(song);
		return channel.send(`${Emojis.Check} Added **${song.safeTitle}** to the queue!`);
	}

	public remove(num: number, channel: TextChannel): Promise<Message | void> {
		if (num <= this.queue.length) {
			const song = this.queue[num];
			this.queue.splice(num, 1);
			return channel.send(`Removed ${song.safeTitle} from the queue.`);
		}
	}

	public clear(channel: TextChannel): MusicHandler {
		this.queue = [];
		this.client.emit(Events.MusicQueueClear, channel);
		return this;
	}

	public async connect(voiceChannel: VoiceChannel, channel: TextChannel): Promise<MusicHandler> {
		await this.player.join(voiceChannel.id, { deaf: true });
		this.client.emit(Events.MusicConnect, voiceChannel, channel);
		return this;
	}

	public async leave(channel: TextChannel): Promise<MusicHandler> {
		const { voiceChannel } = this;
		if (this.playing) await this.player.pause(true);
		await this.player.leave();
		this.client.emit(Events.MusicLeave, voiceChannel, channel);
		this.reset();
		return this;
	}

	public async play(channel: TextChannel): Promise<MusicHandler> {
		if (!this.queue.length) throw `${Emojis.Empty} No songs in the queue!`;
		if (this.playing) throw 'Already playing!';

		this.song = this.queue.shift();
		await this.player.play(this.song.track);
		this.client.emit(Events.MusicSongPlay, this.song, channel);

		return this;
	}

	public async pause(channel: TextChannel): Promise<MusicHandler> {
		if (!this.paused) {
			await this.player.pause(true);
			this.client.emit(Events.MusicSongPause, channel);
		}
		return this;
	}

	public async resume(channel: TextChannel): Promise<MusicHandler> {
		if (!this.playing) {
			await this.player.pause(false);
			this.client.emit(Events.MusicSongResume, channel);
		}
		return this;
	}

	public async skip(channel: TextChannel): Promise<MusicHandler> {
		if (this.song) {
			if (this.replay) this.replay = false;
			this.client.emit(Events.MusicSongSkip, this.song, channel);
			await this.player.stop();
		}
		return this;
	}

	public async seek(position: number, channel: TextChannel): Promise<MusicHandler> {
		const { player } = this;
		if (player) {
			await player.seek(position);
			this.client.emit(Events.MusicSongSeek, position, channel);
		}
		return this;
	}

	public async setVolume(volume: number, channel: TextChannel): Promise<MusicHandler> {
		if (volume <= 0) throw 'If you want me to be silent, don\'t bother asking me to play things...';
		if (volume > 200) throw 'That\'s way too loud fam, I must protecc your ears.';
		await this.player.setVolume(volume);
		this.client.emit(Events.MusicVolumeChange, volume, channel);
		this.volume = volume;
		return this;
	}

	public shuffle(channel: TextChannel): Song[] {
		let { length } = this.queue;

		while (length) {
			const i = Math.floor(Math.random() * length--);
			[this.queue[length], this.queue[i]] = [this.queue[i], this.queue[length]];
		}

		this.client.emit(Events.MusicQueueShuffle, channel);
		return this.queue;
	}

	public setReplay(value: boolean, channel: TextChannel): MusicHandler {
		if (this.replay !== value) {
			this.replay = value;
			this.client.emit(Events.MusicReplayUpdate, this, channel);
		}

		return this;
	}

	public displayQueue(channel: TextChannel): Promise<Message> {
		const { queue } = this;

		const embed = newEmbed()
			.attachFiles(['./assets/images/playlist.png'])
			.setColor(Colors.YellowGreen)
			.setTitle('Music Queue')
			.setThumbnail('attachment://playlist.png');

		if (queue.length < 1) {
			embed.setDescription('There are no songs in the queue!');
		} else {
			for (let i = 0; i < queue.length; i++) {
				const song = queue[i];
				embed.addFields([{ name: `${i + 1}: ${song.safeTitle}`, value: song.url }]);
			}
		}

		return channel.send(embed);
	}

	public reset(): void {
		this.song = null;
		this.channelID = null;
		this.replay = false;
		this.volume = 100;
		this.queue = [];
	}

	public manageable(msg: KlasaMessage): boolean {
		return msg.member.isDJ || (this.song ? this.song.requester === msg.member.id
			: this.queue.every(song => song.requester === msg.member.id));
	}

}
