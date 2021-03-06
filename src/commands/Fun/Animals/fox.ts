import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { ImageAssets } from '@lib/types/Enums';
import { ApplyOptions } from '@skyra/decorators';
import { sendLoadingMessage } from '@utils/util';
import axios from 'axios';
import { MessageEmbed } from 'discord.js';
import { CommandOptions, KlasaMessage } from 'klasa';

@ApplyOptions<CommandOptions>({
	cooldown: 30,
	cooldownLevel: 'author',
	description: lang => lang.tget('commandFoxDescription'),
	extendedHelp: lang => lang.tget('commandFoxExtended'),
	requiredPermissions: ['ATTACH_FILES', 'EMBED_LINKS']
})
export default class extends SteveCommand {

	private foxUrl = 'https://randomfox.ca/';

	public async run(msg: KlasaMessage) {
		const response = await sendLoadingMessage(msg);

		const { data } = await axios.get<FoxResponse>(this.foxUrl);

		const embed = new MessageEmbed()
			.setImage(data.image ?? ImageAssets.Fox);

		return response.edit(undefined, embed);
	}

}

interface FoxResponse {
	image: string;
	link: string;
}
