import { Event, KlasaMessage, Stopwatch } from 'klasa';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Snippet } from '../commands/Snippets/snippet';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { floatPromise } from '@utils/util';

export default class extends Event {

	public run(msg: KlasaMessage, cmd: string): Promise<void> | undefined {
		if (!msg.guild) return;

		cmd = cmd.toLowerCase();

		const snips: Snippet[] = msg.guild.settings.get(GuildSettings.Snippets);
		// eslint-disable-next-line id-length
		const snip = snips.some(s => s.name === cmd);
		if (snip) return this.runSnippet(msg, cmd);
	}

	private async runSnippet(msg: KlasaMessage, cmd: string): Promise<void> {
		const snipCommand = this.client.commands.get('snippet') as SnippetCommand;
		const timer = new Stopwatch();

		try {
			await this.client.inhibitors.run(msg, snipCommand);

			try {
				const commandRun = snipCommand.view(msg, [cmd]);
				timer.stop();
				const response = await commandRun;
				floatPromise(this, this.client.finalizers.run(msg, snipCommand, response, timer));
			} catch (err) {
				this.client.console.error(err);
			}
		} catch (response) {
			this.client.emit('commandInhibited', msg, snipCommand, response);
		}
	}

}

interface SnippetCommand extends SteveCommand {
	add(msg: KlasaMessage, [snipName, snipContent]: [string, string]): Promise<KlasaMessage>;
	edit(msg: KlasaMessage, [snipName, snipContent]: [string, string]): Promise<KlasaMessage>;
	remove(msg: KlasaMessage, [snipName]: [string]): Promise<KlasaMessage>;
	view(msg: KlasaMessage, [snipName]: [string]): Promise<KlasaMessage>;
	source(msg: KlasaMessage, [snipName]: [string]): Promise<KlasaMessage>;
	list(msg: KlasaMessage): Promise<KlasaMessage>;
	reset(msg: KlasaMessage): Promise<KlasaMessage>;
}
