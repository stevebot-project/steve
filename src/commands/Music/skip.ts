import { MusicCommand } from '@lib/structures/commands/MusicCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { MusicHandler } from '@lib/structures/music/MusicHandler';
import { Message } from 'discord.js';

export default class extends MusicCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: 'Add your vote to skip the current song.',
			examples: ['skip', 'skip force'],
			extendedHelp: 'Vote to skip the current song. DJs can force skip songs.',
			music: ['SAME_VOICE_CHANNEL'],
			usage: '[force]',
			helpUsage: '(*force*)'
		});
	}

	public async run(msg: KlasaMessage, [force]: [string]): Promise<MusicHandler | Message> {
		const { music } = msg.guild;
		const song = music.song || music.queue[0];
		const channel = this.getChannel(msg);

		if (msg.member.isDJ && typeof force !== 'undefined') return music.skip(channel);

		if (song.skips.has(msg.member.id)) throw 'You\'ve already voted to skip this song!';
		song.skips.add(msg.member.id);

		const threshold = Math.ceil(music.listeners.length / 2);
		return song.skips.size >= threshold ? music.skip(channel)
			: msg.channel.send(`${msg.author.tag} voted to skip the current song. (${song.skips.size}/${threshold})`);
	}

}
