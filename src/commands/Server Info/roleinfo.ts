import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Role, Message, MessageEmbed } from 'discord.js';
import { formatDate } from '@utils/util';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['membersin'],
			description: lang => lang.get('COMMAND_ROLEINFO_DESCRIPTION'),
			extendedHelp: lang => lang.get('COMAMND_ROLEINFO_EXTENDED'),
			runIn: ['text'],
			usage: '<role:rolename>'
		});
	}

	public async run(msg: KlasaMessage, [role]: [Role]): Promise<Message> {
		if (role.isRestricted && !msg.member!.isStaff) throw msg.guild!.language.tget('COMMAND_ROLEINFO_RESTRICTED');

		let membersList = role.members.map(m => m.user.username).join(', ');

		membersList = membersList.length < 1
			? msg.guild!.language.tget('COMMAND_ROLEINFO_NOMEMBERS')
			: membersList.length > 1024
				? msg.guild!.language.tget('COMMAND_ROLEINFO_TOOMANY')
				: membersList;

		const embed = new MessageEmbed()
			.addFields([
				{ name: role.members.size, value: membersList }
			])
			.setColor(role.hexColor)
			.setDescription(msg.guild!.language.tget('COMMAND_ROLEINFO_CREATED', role.name, formatDate(role.createdTimestamp)))
			.setFooter(msg.guild!.language.tget('COMMAND_ROLEINFO_ASSIGNABLE', role.isAssignable))
			.setTimestamp();

		return msg.channel.send(embed);
	}

}
