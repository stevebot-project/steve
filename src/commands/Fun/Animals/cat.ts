import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { ApplyOptions } from '@skyra/decorators';
import axios from 'axios';
import { MessageEmbed } from 'discord.js';
import { CommandOptions, KlasaMessage } from 'klasa';

@ApplyOptions<CommandOptions>({
	aliases: ['kitty'],
	cooldown: 30,
	cooldownLevel: 'author',
	description: lang => lang.tget('commandCatDescription'),
	extendedHelp: lang => lang.tget('commandCatExtended'),
	requiredPermissions: ['ATTACH_FILES', 'EMBED_LINKS']
})
export default class extends SteveCommand {

	private catUrl = 'https://cataas.com/cat';

	public async run(msg: KlasaMessage) {
		const embed = new MessageEmbed();

		try {
			const res = await axios.get(this.catUrl, { responseType: 'arraybuffer' });
			const img = Buffer.from(res.data);

			embed.attachFiles([{ attachment: img, name: 'randomcat.jpg' }]).setImage('attachment://randomcat.jpg');
		} catch {
			embed.attachFiles(['./assets/images/animals/cat.png']).setImage('attachment://cat.png');
		}


		return msg.channel.send(embed);
	}

}
