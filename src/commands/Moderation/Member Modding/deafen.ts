import { ModerationCommand, ModerationCommandOptions } from '@lib/structures/commands/ModerationCommand';
import { User, GuildMember, Guild, Message } from 'discord.js';
import { ApplyOptions } from '@skyra/decorators';
import { GuildMessage } from '@lib/types/Messages';

@ApplyOptions<ModerationCommandOptions>({
	description: lang => lang.tget('COMMAND_DEAFEN_DESCRIPTION'),
	duration: true,
	extendedHelp: lang => lang.tget('COMMAND_DEAFEN_EXTENDED'),
	requiredSettings: ['roles.deafened']
})
export default class extends ModerationCommand {

	public async prehandle(target: User, guild: Guild): Promise<GuildMember> {
		const member = await guild.members.fetch(target);
		if (!member) throw guild.language.tget('USER_NOT_IN_GUILD', target.tag);
		return member;
	}

	public async handle(msg: GuildMessage, target: GuildMember, reason: string): Promise<GuildMember> {
		try {
			await msg.guild.moderation.deafen(target, reason);
		} catch (err) {
			this.client.console.error(err);
			throw msg.guild.language.tget('COMMAND_DEAFEN_UNABLE', target.user.tag);
		}

		return target;
	}

	public async posthandle(msg: GuildMessage, target: GuildMember, reason: string, duration: number | undefined): Promise<Message> {
		const modTask = duration
			? await this.client.schedule.createModerationTask('undeafen', duration, { targetID: target.id, guildID: msg.guild.id })
			: null;

		const thisCase = await msg.guild.moderation.cases.createCase('deafen', msg.author, target.user, reason, duration, modTask);

		return msg.channel.send(msg.guild.language.tget('COMMAND_DEAFEN_SUCCESS', target.user.tag, thisCase));
	}


}
