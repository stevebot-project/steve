import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { ApplyOptions } from '@skyra/decorators';
import { formatDate, sendLoadingMessage } from '@utils/util';
import { MessageEmbed } from 'discord.js';
import { CommandOptions, KlasaMessage } from 'klasa';
import { oneLine } from 'common-tags';
import axios from 'axios';

interface XkcdComic {
	alt: string;
	day: string;
	img: string;
	link: string;
	month: string;
	news: string;
	num: number;
	safe_title: string;
	title: string;
	transcript: string;
	year: string;
}

@ApplyOptions<CommandOptions>({
	cooldown: 15,
	cooldownLevel: 'author',
	description: lang => lang.tget('commandXkcdDescription'),
	extendedHelp: lang => lang.tget('commandXkcdExtended'),
	requiredPermissions: ['EMBED_LINKS'],
	usage: '[comicNumber:integer]'
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage, [comicID]: [number]) {
		const response = await sendLoadingMessage(msg);

		const comic = comicID
			? await this.getXkcdByNumber(comicID).catch(() => { throw msg.language.tget('commandXkcdInvalid'); })
			: await this.getCurrentXkcd();

		const embed = new MessageEmbed()
			.setColor(0x2242c7)
			.setDescription(comic.transcript || comic.alt)
			.setImage(comic.img)
			.setTimestamp()
			.setTitle(oneLine`${comic.safe_title} (#${comic.num},
				${formatDate(new Date(Number(comic.year), Number(comic.month) - 1, Number(comic.day)), 'YYYY MMMM Do')})`);

		return response.edit(undefined, embed);
	}

	private async getCurrentXkcd() {
		const res = await axios.get<XkcdComic>(`http://xkcd.com/info.0.json`);
		return res.data;
	}

	/**
	 *
	 * @param id The ID of the desired comic
	 */
	private async getXkcdByNumber(id: number) {
		const res = await axios.get<XkcdComic>(`http://xkcd.com/${id}/info.0.json`);
		return res.data;
	}


}
