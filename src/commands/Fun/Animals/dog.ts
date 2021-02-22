import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { ApplyOptions } from '@skyra/decorators';
import axios from 'axios';
import { MessageEmbed } from 'discord.js';
import { CommandOptions, KlasaMessage } from 'klasa';

@ApplyOptions<CommandOptions>({
	aliases: ['puppy'],
	cooldown: 30,
	cooldownLevel: 'author',
	description: lang => lang.tget('commandDogDescription'),
	extendedHelp: lang => lang.tget('commandDogExtended'),
	requiredPermissions: ['ATTACH_FILES', 'EMBED_LINKS']
})
export default class extends SteveCommand {

	private dogUrl = 'https://dog.ceo/api/breeds/image/random';

	public async run(msg: KlasaMessage) {
		const { data } = await axios.get<DogResponse>(this.dogUrl);

		const embed = new MessageEmbed();

		data.status === 'success'
			? embed.setImage(data.message)
			: embed.attachFiles(['./assets/images/animals/dog.jpg']).setImage('attachment://dog.jpg');

		return msg.channel.send(embed);
	}

}

interface DogResponse {
	message: string;
	status: string;
}
