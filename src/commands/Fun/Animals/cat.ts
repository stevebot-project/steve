import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { ImageAssets } from '@lib/types/Enums';
import { ApplyOptions } from '@skyra/decorators';
import { sendLoadingMessage } from '@utils/util';
import axios from 'axios';
import { MessageEmbed } from 'discord.js';
import { CommandOptions, KlasaMessage } from 'klasa';

@ApplyOptions<CommandOptions>({
	aliases: ['kitty'],
	cooldown: 30,
	cooldownLevel: 'author',
	description: lang => lang.tget('commandCatDescription'),
	extendedHelp: lang => lang.tget('commandCatExtended'),
	requiredPermissions: ['EMBED_LINKS']
})
export default class extends SteveCommand {

	private catUrl = 'https://cataas.com';

	public async run(msg: KlasaMessage) {
		const response = await sendLoadingMessage(msg);
		const embed = new MessageEmbed();

		try {
			const { data } = await axios.get<CatResponse>(`${this.catUrl}/cat?json=true`);

			embed.setImage(data.url
				? `${this.catUrl}${data.url}`
				: ImageAssets.Cat);
		} catch {
			embed.setImage(ImageAssets.Cat);
		}

		return response.edit(undefined, embed);
	}

}

interface CatResponse {
	id: string;
	created_at: string;
	tags: string[];
	url: string;
}
