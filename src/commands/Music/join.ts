import { MusicCommand } from '@lib/structures/commands/MusicCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { NAME } from '@root/config';
import { MusicHandler } from '@lib/structures/music/MusicHandler';

export default class extends MusicCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['connect', 'music'],
			description: `Connects ${NAME} to a voice channel.`,
			examples: ['join'],
			music: ['USER_VOICE_CHANNEL']
		});
	}

	public async run(msg: KlasaMessage): Promise<MusicHandler> {
		msg.guild.music.channelID = msg.channel.id;
		return msg.guild.music.connect(msg.member.voice.channel, msg.guild.music.textChannel);
	}

}
