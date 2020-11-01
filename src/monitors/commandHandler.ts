import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { floatPromise } from '@utils/util';
import { KlasaMessage, Monitor, MonitorStore, Stopwatch } from 'klasa';

export default class extends Monitor {

	public constructor(store: MonitorStore, file: string[], directory: string) {
		super(store, file, directory, { ignoreOthers: false });
		this.ignoreEdits = !this.client.options.commandEditing;
	}

	public async run(msg: KlasaMessage) {
		if (msg.guild && !msg.guild.me) await msg.guild.members.fetch(this.client.user!);
		// @ts-expect-error 2339
		if (!msg.channel.postable) return undefined;
		if (!msg.commandText && msg.prefix === this.client.mentionPrefix) {
			return msg.sendLocale('PREFIX_REMINDER',
				[msg.guildSettings.get(GuildSettings.Prefix).length
					? msg.guildSettings.get(GuildSettings.Prefix)
					: undefined]);
		}
		if (!msg.commandText) return undefined;
		if (!msg.command) return this.client.emit('commandUnknown', msg, msg.commandText, msg.prefix, msg.prefixLength);
		this.client.emit('commandRun', msg, msg.command, msg.args);

		return this.runCommand(msg);
	}

	private async runCommand(msg: KlasaMessage) {
		const timer = new Stopwatch();
		if (this.client.options.typing) floatPromise(this, msg.channel.startTyping());
		try {
			await this.client.inhibitors.run(msg, msg.command!);
			try {
				// @ts-ignore 2341
				await msg.prompter!.run();
				try {
					const subcommand = msg.command!.subcommands ? msg.params.shift() : undefined;
					// @ts-expect-error 7053
					const commandRun = subcommand ? msg.command![subcommand](msg, msg.params) : msg.command!.run(msg, msg.params);
					timer.stop();
					const response = await commandRun;
					floatPromise(this, this.client.finalizers.run(msg, msg.command!, response, timer));
					this.client.emit('commandSuccess', msg, msg.command, msg.params, response);
				} catch (error) {
					this.client.emit('commandError', msg, msg.command, msg.params, error);
				}
			} catch (argumentError) {
				this.client.emit('argumentError', msg, msg.command, msg.params, argumentError);
			}
		} catch (response) {
			this.client.emit('commandInhibited', msg, msg.command, response);
		}
		if (this.client.options.typing) msg.channel.stopTyping();
	}

}
