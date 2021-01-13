import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { UserSettings } from '@lib/types/settings/UserSettings';
import { ApplyOptions } from '@skyra/decorators';
import { Message, MessageEmbed, User } from 'discord.js';
import { CommandOptions, KlasaMessage } from 'klasa';

@ApplyOptions<CommandOptions>({
	aliases: ['av'],
	description: lang => lang.tget('commandAvatarDescription'),
	requiredPermissions: ['EMBED_LINKS'],
	usage: '[user:username]'
})
export default class extends SteveCommand {

	public async init() {
		this.createCustomResolver('username', (str, possible, msg) => {
			const arg = this.client.arguments.get('username');

			return str ? arg.run(str, possible, msg) : arg.run(msg.author.tag, possible, msg);
		});
	}

	public async run(msg: KlasaMessage, [user]: [User]): Promise<Message> {
		const member = msg.guild ? await msg.guild.members.fetch(user.id) : null;

		try {
			const embed = new MessageEmbed()
				.setAuthor(user.tag)
				.setImage(user.displayAvatarURL({ dynamic: true }));

			const userColor = user.settings.get(UserSettings.EmbedColor);
			if (userColor) {
				embed.setColor(userColor);
			} else if (member) {
				embed.setColor(member.displayHexColor);
			}

			return msg.channel.send(embed);
		} catch (e) {
			return msg.channel.send(msg.language.tget('commandAvatarCannotDisplay', user.tag));
		}
	}

}
