import { Extendable, ExtendableStore } from 'klasa';
import { GuildChannelManager, Snowflake, GuildChannel, TextChannel } from 'discord.js';

export default class extends Extendable {

	public constructor(store: ExtendableStore, file: string[], directory: string) {
		super(store, file, directory, { appliesTo: [GuildChannelManager] });
	}

	public get lockedChannels(this: GuildChannelManager): Snowflake[] {
		const filter = (channel: GuildChannel): boolean => {
			if (channel instanceof TextChannel) {
				if (!channel.permissionOverwrites.has(this.guild.id)) return false;
				if (channel.permissionOverwrites.get(this.guild.id).deny.has('SEND_MESSAGES')) return true;
			}
			return false;
		};

		return this.guild.channels.cache.filter(filter).map(channel => channel.id);
	}

	public async lock(this: GuildChannelManager, target: TextChannel): Promise<TextChannel> {
		if (!this.lockedChannels.includes(target.id)) {
			await target.updateOverwrite(this.guild.id, { SEND_MESSAGES: false });
		}
		return target;
	}

	public async slow(target: TextChannel, ratelimit: number): Promise<TextChannel> {
		await target.setRateLimitPerUser(ratelimit);
		return target;
	}

	public async unlock(this: GuildChannelManager, target: TextChannel): Promise<TextChannel> {
		if (this.lockedChannels.includes(target.id)) {
			await target.updateOverwrite(this.guild.id, { SEND_MESSAGES: true });
		}
		return target;
	}

}
