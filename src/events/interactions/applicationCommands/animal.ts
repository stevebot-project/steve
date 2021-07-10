import { ApplicationCommand } from '@lib/structures/events/ApplicationCommand';
import { ImageAssets } from '@lib/types/Enums';
import axios from 'axios';
import { APIApplicationCommandInteraction, APIApplicationCommandInteractionDataOptionWithValues, APIInteractionApplicationCommandCallbackData } from 'discord-api-types/payloads/v8';
import { MessageEmbed } from 'discord.js';

export default class extends ApplicationCommand {

	public async handle(interaction: APIApplicationCommandInteraction): Promise<APIInteractionApplicationCommandCallbackData> {
		const animal = (interaction.data.options![0] as APIApplicationCommandInteractionDataOptionWithValues).value as Animal;

		switch (animal) {
			case 'cat':
				return this.cat();
			case 'dog':
				return this.dog();
			case 'fox':
				return this.fox();
			case 'koala':
				return this.koala();
			case 'panda':
				return this.panda();
			case 'red_panda':
				return this.redpanda();
		}
	}

	private async cat(): Promise<APIInteractionApplicationCommandCallbackData> {
		const embed = new MessageEmbed();

		try {
			const { data } = await axios.get<CatResponse>('https://cataas.com/cat?json=true');

			embed.setImage(data.url
				? `https://cataas.com${data.url}`
				: ImageAssets.Cat);
		} catch {
			embed.setImage(ImageAssets.Cat);
		}

		return { embeds: [embed.toJSON()] };
	}

	private async dog(): Promise<APIInteractionApplicationCommandCallbackData> {
		const embed = new MessageEmbed();

		try {
			const { data } = await axios.get<DogResponse>('https://dog.ceo/api/breeds/image/random');

			embed.setImage(data.message);
		} catch {
			embed.setImage(ImageAssets.Dog);
		}

		return { embeds: [embed.toJSON()] };
	}

	private async fox(): Promise<APIInteractionApplicationCommandCallbackData> {
		const embed = new MessageEmbed();

		try {
			const { data } = await axios.get<FoxResponse>('https://randomfox.ca/floof');
			embed.setImage(data.image ?? ImageAssets.Fox);
		} catch {
			embed.setImage(ImageAssets.Fox);
		}

		return { embeds: [embed.toJSON()] };
	}

	private async koala(): Promise<APIInteractionApplicationCommandCallbackData> {
		const embed = new MessageEmbed();

		try {
			const { data } = await axios.get<SomeRandomApiResponse>('https://some-random-api.ml/img/koala');
			embed.setImage(data.link);
		} catch {
			embed.setDescription('Whoops! Couldn\'t find an image. Soon:tm: I\'ll have a fallback image like I do for dogs/cats/foxes, but you can bug my developers about that.');
		}

		return { embeds: [embed.toJSON()] };
	}

	private async panda(): Promise<APIInteractionApplicationCommandCallbackData> {
		const embed = new MessageEmbed();

		try {
			const { data } = await axios.get<SomeRandomApiResponse>('https://some-random-api.ml/img/panda');

			data.link
				? embed.setImage(data.link)
				: embed.setDescription('Whoops! Couldn\'t find an image. Soon:tm: I\'ll have a fallback image like I do for dogs/cats/foxes, but you can bug my developers about that.');
		} catch {
			embed.setDescription('Whoops! Couldn\'t find an image. Soon:tm: I\'ll have a fallback image like I do for dogs/cats/foxes, but you can bug my developers about that.');
		}

		return { embeds: [embed.toJSON()] };
	}

	private async redpanda(): Promise<APIInteractionApplicationCommandCallbackData> {
		const embed = new MessageEmbed();

		try {
			const { data } = await axios.get<SomeRandomApiResponse>('https://some-random-api.ml/img/red_panda');

			data.link
				? embed.setImage(data.link)
				: embed.setDescription('Whoops! Couldn\'t find an image. Soon:tm: I\'ll have a fallback image like I do for dogs/cats/foxes, but you can bug my developers about that.');
		} catch {
			embed.setDescription('Whoops! Couldn\'t find an image. Soon:tm: I\'ll have a fallback image like I do for dogs/cats/foxes, but you can bug my developers about that.');
		}

		return { embeds: [embed.toJSON()] };
	}

}

interface CatResponse {
	id: string;
	created_at: string;
	tags: string[];
	url: string;
}

interface DogResponse {
	message: string;
	status: string;
}

interface FoxResponse {
	image: string;
	link: string;
}

interface SomeRandomApiResponse {
	link: string;
}

type Animal = 'dog' | 'cat' | 'fox' | 'koala' | 'panda' | 'red_panda';
