import { Event, EventStore } from 'klasa';
import { Message, DMChannel, TextChannel, GuildEmoji, Role, GuildAuditLogsAction, MessageEmbed, VoiceChannel, NewsChannel, CategoryChannel } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { newEmbed, getExecutor } from '@lib/util/util';

export abstract class CreateDeleteEvent extends Event {

	protected constructor(store: EventStore, file: string[], directory: string) {
		super(store, file, directory);

		this.event = this.name;
	}

	public async run(obj: TextChannel | VoiceChannel | NewsChannel | CategoryChannel | GuildEmoji | Role): Promise<Message | void> {
		if (obj instanceof DMChannel) return this.client.console.log('No logging of DM channels.');

		const serverlog = obj.guild.channels.cache.get(obj.guild.settings.get(GuildSettings.Channels.Serverlog));
		if (!serverlog) return this.client.console.log(`${obj.guild.name} has not set a serverlog.`);

		let objName = obj.constructor.name;
		objName = objName === 'TextChannel' || objName === 'VoiceChannel' || objName === 'NewsChannel' || objName === 'CategoryChannel'
			? 'Channel' : objName === 'GuildEmoji' ? 'Emoji' : objName;

		const executor = await getExecutor(obj.guild, this.getAuditLogAction(this.name) as GuildAuditLogsAction);

		const embed = newEmbed()
			.setAuthor(executor.tag, executor.displayAvatarURL())
			.setFooter(`${objName} ID: ${obj.id}`)
			.setTimestamp();

		try {
			await this.handle(obj, embed);
		} catch {
			// halllooooooo
		}

		return (serverlog as TextChannel).send(embed); // eslint-disable-line no-extra-parens
	}

	public abstract handle(obj: TextChannel | VoiceChannel | NewsChannel | CategoryChannel | GuildEmoji | Role, embed: MessageEmbed): Promise<MessageEmbed>;

	private getAuditLogAction(name: string): string {
		return name.replace(/[\w]([A-Z])/g, (m) => `${m[0]}_${m[1]}`).toUpperCase();
	}

}
