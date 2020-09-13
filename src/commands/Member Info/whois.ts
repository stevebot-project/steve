import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { User, Message, Guild, MessageEmbed, ColorResolvable } from 'discord.js';
import { friendlyDuration, formatDate } from '@utils/util';
import { Time } from '@lib/types/Enums';
import { UserSettings } from '@lib/types/settings/UserSettings';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['member'],
			description: lang => lang.get('COMMAND_WHOIS_DESCRIPTION'),
			extendedHelp: lang => lang.get('COMMAND_WHOIS_EXTENDED'),
			runIn: ['text'],
			usage: '[user:username]'
		});

		this.createCustomResolver('username', (str, possible, msg) => {
			const arg = this.client.arguments.get('username');

			return str ? arg.run(str, possible, msg) : arg.run(msg.author.tag, possible, msg);
		});
	}

	public async run(msg: KlasaMessage, [user]: [User]): Promise<Message> {
		user = await this.client.users.fetch(user.id);
		const member = await msg.guild!.members.fetch(user);
		if (!member) throw msg.guild!.language.tget('USER_NOT_IN_GUILD', user.tag);

		const accountCreated = msg.guild!.language.tget('COMMAND_WHOIS_DATE',
			friendlyDuration(Date.now() - user.createdTimestamp), formatDate(user.createdTimestamp));

		const joinedGuild = this.getJoinDateString(member.joinedTimestamp!, msg.guild!);

		const EMBED_DATA = msg.guild!.language.tget('COMMAND_WHOIS_EMBED');

		const embed = new MessageEmbed()
			.addFields([
				{ name: EMBED_DATA.FIELD_TITLES.DISPLAY_NAME, value: member.displayName, inline: true },
				{ name: EMBED_DATA.FIELD_TITLES.ACCOUNT_CREATED, value: accountCreated, inline: true },
				{ name: EMBED_DATA.FIELD_TITLES.JOINED_GUILD, value: joinedGuild, inline: true }
			])
			.setAuthor(user.tag, user.displayAvatarURL())
			.setColor(user.settings.get(UserSettings.EmbedColor) as ColorResolvable || 0x61e3f9)
			.setFooter(EMBED_DATA.FOOTER(member.id))
			.setTimestamp();

		if (member.roles.cache.size > 1) {
			embed.addFields([
				{
					name: EMBED_DATA.FIELD_TITLES.ROLES,
					// eslint-disable-next-line newline-per-chained-call
					value: member.roles.cache.filter(r => r.id !== r.guild.id).sort().array().join(' ')
				}
			]);
		}

		return msg.channel.send(embed);
	}

	private getJoinDateString(timestamp: number, guild: Guild): string {
		const timeSinceJoin = Date.now() - timestamp;
		const joinDate = formatDate(timestamp);

		if (timeSinceJoin > Time.DAY && timeSinceJoin < Time.HOUR * 31) {
			return guild.language.tget('COMMAND_WHOIS_JOINEDGUILD_HOURS', Math.floor(timeSinceJoin / Time.HOUR), joinDate);
		}

		return guild.language.tget('COMMAND_WHOIS_DATE', friendlyDuration(timeSinceJoin), joinDate);
	}

}
