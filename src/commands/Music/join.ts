import { MusicCommand } from '@lib/structures/commands/MusicCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { MusicHandler } from '@lib/structures/music/MusicHandler';

export default class extends MusicCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['connect', 'music'],
			description: lang => lang.get('COMMAND_JOIN_DESCRIPTION'),
			examples: ['join'],
			music: ['USER_VOICE_CHANNEL']
		});
	}

	public async run(msg: KlasaMessage): Promise<MusicHandler> {
		msg.guild.music.channelID = msg.channel.id;
		return msg.guild.music.connect(msg.member.voice.channel, msg.guild.music.textChannel);
	}

}
