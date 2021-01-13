import { ModerationCommand, ModerationCommandOptions } from '@lib/structures/commands/ModerationCommand';
import { User, GuildMember, Guild, Message } from 'discord.js';
import { ApplyOptions } from '@skyra/decorators';
import { GuildMessage } from '@lib/types/Messages';

@ApplyOptions<ModerationCommandOptions>({
	description: lang => lang.tget('commandMuteDescription'),
	duration: true,
	extendedHelp: lang => lang.tget('commandMuteExtended'),
	requiredPermissions: ['MANAGE_ROLES'],
	requiredSettings: ['roles.muted']
})
export default class extends ModerationCommand {

	public async prehandle(target: User, guild: Guild): Promise<GuildMember> {
		const member = await guild.members.fetch(target);
		if (!member) throw guild.language.tget('userNotInGuild', target.tag);
		return member;
	}

	public async handle(msg: GuildMessage, target: GuildMember, reason: string): Promise<GuildMember> {
		try {
			await msg.guild.moderation.mute(target, reason);
		} catch (err) {
			this.client.console.error(err);
			throw msg.guild.language.tget('commandMuteUnable', target.user.tag);
		}

		return target;
	}

	public async posthandle(msg: GuildMessage, target: GuildMember, reason: string, duration: number | undefined): Promise<Message> {
		const modTask = duration
			? await this.client.schedule.createModerationTask('unmute', duration, { targetID: target.id, guildID: msg.guild.id })
			: null;

		const thisCase = await msg.guild.moderation.cases.createCase('mute', msg.author, target.user, reason, duration, modTask);

		return msg.channel.send(msg.guild.language.tget('commandMuteSuccess', target.user.tag, thisCase));
	}

}
