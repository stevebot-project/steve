import { SteveCommand, SteveCommandOptions } from '@lib/structures/commands/SteveCommand';
import { ApplicationCommands } from '@lib/types/Enums';
import { UserSettings } from '@lib/types/settings/UserSettings';
import { ApplyOptions, CreateResolvers } from '@skyra/decorators';
import { Message, MessageEmbed, User } from 'discord.js';
import { KlasaMessage } from 'klasa';

@ApplyOptions<SteveCommandOptions>({
	aliases: ['av'],
	description: lang => lang.tget('commandAvatarDescription'),
	deprecatedForSlash: ApplicationCommands.Avatar,
	requiredPermissions: ['EMBED_LINKS'],
	usage: '[user:username]'
})
@CreateResolvers([
	[
		'username',
		(str, possible, msg) => {
			const usernameArgument = msg.client.arguments.get('username');

			return str
				? usernameArgument.run(str, possible, msg)
				: usernameArgument.run(msg.author.tag, possible, msg);
		}
	]
])
export default class extends SteveCommand {

	public async run(msg: KlasaMessage, [user]: [User]): Promise<Message> {
		if (!user) throw msg.language.tget('userNotFound');
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
