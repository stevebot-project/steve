import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { ImageAssets } from '@lib/types/Enums';
import { ApplyOptions } from '@skyra/decorators';
import { sendLoadingMessage } from '@utils/util';
import axios from 'axios';
import { MessageEmbed } from 'discord.js';
import { CommandOptions, KlasaMessage } from 'klasa';

@ApplyOptions<CommandOptions>({
	aliases: ['puppy'],
	cooldown: 30,
	cooldownLevel: 'author',
	description: lang => lang.tget('commandDogDescription'),
	extendedHelp: lang => lang.tget('commandDogExtended'),
	requiredPermissions: ['EMBED_LINKS']
})
export default class extends SteveCommand {

	private dogUrl = 'https://dog.ceo/api/breeds/image/random';

	public async run(msg: KlasaMessage) {
		const response = await sendLoadingMessage(msg);
		const embed = new MessageEmbed();

		try {
			const { data } = await axios.get<DogResponse>(this.dogUrl);

			embed.setImage(data.message);
		} catch {
			embed.setImage(ImageAssets.Dog);
		}

		return response.edit(undefined, embed);
	}

}

interface DogResponse {
	message: string;
	status: string;
}
