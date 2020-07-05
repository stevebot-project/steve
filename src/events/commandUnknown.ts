import { Event, KlasaMessage } from 'klasa';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Snippet } from '../commands/Snippets/snippet';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';

export default class extends Event {

	public run(msg: KlasaMessage, cmd: string): Promise<KlasaMessage> | undefined {
		if (!msg.guild) return;

		cmd = cmd.toLowerCase();

		const snipCommand = this.client.commands.get('snippet') as SnippetCommand;
		const snips: Snippet[] = msg.guild.settings.get(GuildSettings.Snippets);
		const snip = snips.some(s => s.name === cmd);
		if (snip) return snipCommand.view(msg, [cmd]);
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
