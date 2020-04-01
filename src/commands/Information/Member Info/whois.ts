import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { GuildMember, Message, ColorResolvable } from 'discord.js';
import moment from 'moment';
import { UserSettings } from '@lib/types/settings/UserSettings';
import { Colors } from '@lib/types/enums';
import { newEmbed, friendlyDuration } from '@utils/util';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['member'],
			description: 'Gives an overview of a member\'s info.',
			examples: ['whois', 'whois jonathan', 'whois boedj#5476'],
			extendedHelp: 'Doing this command without providing a member will show info about yourself.',
			runIn: ['text'],
			usage: '[member:membername]',
			helpUsage: 'member'
		});
	}

	public async run(msg: KlasaMessage, [targetMember = msg.member]: [GuildMember]): Promise<Message> {
		const fetchedMember = await msg.guild.members.fetch(targetMember);

		const fetchedMemberRoles = fetchedMember.roles.cache.size > 1
			? fetchedMember.roles.cache.filter(r => r.id !== r.guild.id).sort().array().join(' ') : 'None';

		const fetchedMemberAccountAge = `${friendlyDuration(Date.now() - fetchedMember.user.createdTimestamp)}
			ago (${moment(fetchedMember.user.createdTimestamp).format('MM-DD-YY')})`;

		const fetchedMemberJoinedServer = `${friendlyDuration(Date.now() - fetchedMember.joinedTimestamp)} ago
			(${moment(fetchedMember.joinedTimestamp).format('MM-DD-YY')})`;

		const embed = newEmbed()
			.setAuthor(fetchedMember.user.tag, fetchedMember.user.displayAvatarURL())
			.setColor(fetchedMember.user.settings.get(UserSettings.EmbedColor) as ColorResolvable || Colors.Turquoise)
			.setTimestamp()
			.setFooter(`Member ID: ${fetchedMember.id}`)
			.addFields([
				{ name: 'Display Name', value: fetchedMember.displayName, inline: true },
				{ name: 'Account Created', value: fetchedMemberAccountAge, inline: true },
				{ name: 'Joined Server', value: fetchedMemberJoinedServer, inline: true },
				{ name: 'Roles', value: fetchedMemberRoles }
			]);

		return msg.channel.send(embed);
	}

}
