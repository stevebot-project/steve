import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { ApplyOptions } from '@skyra/decorators';
import { formatDate } from '@utils/util';
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
	aliases: ['x'],
	cooldown: 15,
	cooldownLevel: 'author',
	description: lang => lang.tget('COMMAND_XKCD_DESCRIPTION'),
	extendedHelp: lang => lang.tget('COMMAND_XKCD_EXTENDED'),
	requiredPermissions: ['EMBED_LINKS'],
	subcommands: true,
	usage: '<new|random:default> [comicNumber:integer]'
})
export default class extends SteveCommand {

	public async random(msg: KlasaMessage, [comicID]: [number]) {
		const comic = comicID
			? await this.getXkcdByNumber(comicID).catch(() => { throw msg.language.tget('COMMAND_XKCD_INVALID'); })
			: await this.getRandomXkcd();

		return msg.channel.send(this.createComicEmbed(comic));
	}

	public async new(msg: KlasaMessage, [comicID]: [number]) {
		const comic = comicID
			? await this.getXkcdByNumber(comicID).catch(() => { throw msg.language.tget('COMMAND_XKCD_INVALID'); })
			: await this.getCurrentXkcd();

		return msg.channel.send(this.createComicEmbed(comic));
	}

	/**
	 *
	 * @param comic The Xkcd commic used to form the embed
	 */
	private createComicEmbed(comic: XkcdComic): MessageEmbed {
		const description = (comic.transcript || comic.alt)
			.replace(/{{/g, '{')
			.replace(/}}/g, '}')
			.replace(/\[\[/g, '[')
			.replace(/]]/g, ']')
			.replace(/<</g, '<')
			.replace(/>>/g, '>');
		return new MessageEmbed()
			.setColor(0x2242c7)
			.setDescription(`${description}\n\nhttps://xkcd.com/${comic.num}/`)
			.setImage(comic.img)
			.setTimestamp()
			.setTitle(oneLine`${comic.safe_title} (#${comic.num},
				${formatDate(new Date(Number(comic.year), Number(comic.month) - 1, Number(comic.day)), 'YYYY MMMM Do')})`);
	}

	private async getCurrentXkcd() {
		const res = await axios.get<XkcdComic>(`http://xkcd.com/info.0.json`);
		return res.data;
	}

	private async getRandomXkcd() {
		const comicID = Math.trunc((Math.random() * ((await this.getCurrentXkcd()).num - 1)) + 1);
		return this.getXkcdByNumber(comicID);
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
