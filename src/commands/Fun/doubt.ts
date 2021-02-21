import { CommandOptions, KlasaMessage } from 'klasa';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { Message, MessageReaction } from 'discord.js';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<CommandOptions>({
	aliases: ['x'],
	description: lang => lang.tget('commandDoubtDescription'),
	extendedHelp: lang => lang.tget('commandDoubtExtended')
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage): Promise<Message | MessageReaction> {
		if (!msg.reference?.messageID) return msg.channel.send(msg.language.tget('commandDoubtExtended'));

		const targetMessage = msg.channel.messages.cache.get(msg.reference.messageID);

		if (!targetMessage) return msg.channel.send(msg.language.tget('commandDoubtFail'));

		return targetMessage.react('805574339651043378');
	}

}
