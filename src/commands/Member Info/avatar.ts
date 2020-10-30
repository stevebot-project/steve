import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { Message, MessageEmbed, User } from 'discord.js';
import { CommandStore, KlasaMessage } from 'klasa';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['av'],
			description: lang => lang.tget('COMMAND_AVATAR_DESCRIPTION'),
			usage: '<user:username>'
		});
	}

	public async run(msg: KlasaMessage, [user]: [User]): Promise<Message> {
		const member = msg.guild ? await msg.guild.members.fetch(user.id) : null;

		try {
			const embed = new MessageEmbed()
				.setAuthor(user.tag)
				.setImage(user.displayAvatarURL({ dynamic: true }));

			if (member) embed.setColor(member.displayHexColor);

			return msg.channel.send(embed);
		} catch (e) {
			return msg.channel.send(msg.guild!.language.tget('COMMAND_AVATAR_CANNOTDISPLAY', user.tag));
		}
	}

}
