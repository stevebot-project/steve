import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { ApplyOptions } from '@skyra/decorators';
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

	private foxUrl = 'https://randomfox.ca/floof';

	public async run(msg: KlasaMessage) {
		const res = await axios.get<FoxResponse>(this.foxUrl);

		const embed = new MessageEmbed();

		res.data.image
			? embed.setImage(res.data.image)
			: embed.attachFiles(['./assets/images/animals/fox.png']).setImage('attachment://fox.png');


		return msg.channel.send(embed);
	}

}

interface FoxResponse {
	image: string;
	link: string;
}
