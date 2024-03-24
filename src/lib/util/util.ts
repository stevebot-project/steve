import type { ApplicationCommandRegistry } from "@sapphire/framework";
import { Timestamp } from "@sapphire/timestamp";
import { pickRandom } from "@sapphire/utilities";

export const defaultDateFormat = new Timestamp("YYYY MMM D");

export function registerBasicCommand(
	registry: ApplicationCommandRegistry,
	name: string,
	description: string,
) {
	registry.registerChatInputCommand((builder) =>
		builder.setName(name).setDescription(description),
	);
}

export function randomDftba() {
	const dftba = [
		"Don't Forget to be Awesome",
		"Darling, Fetch the Battle Axe",
		"Definitely Fondue this Bot Always",
		"Don't Fear the Bachelors of Arts",
		"Democracy Fails Totally Before Apathy",
		"Don't Forget To Buy Anoraks",
		"Definitely Feeling The Balmy Avocados",
		"Definitely Forge The Best Artichokes",
		"Demons Feed The Best Anyway",
		"Definitely Forge The Bees Armour",
		"Dave: Forgotten Through Brotherly Adventures",
		"Demons Find Turquoise Bears Attractive",
		"Do Find Tea, Beat Apathy",
		"Don't Forget That Brains Attract",
		"Decepticons Fear This Brilliant Autobot",
		"Darkened Forests Take Bravery Away",
		"Drunk Fish Try Breathing Air",
		"Dastardly Farmers Took Bessie Away",
		"Damn Fine To Be Alive",
		"Donate For The Blood Association",
		"Dead Frogs Teach Bored Anatomists",
		"Duel For The Best Acronym",
		"Dandelions Fly Through Blue Air",
		"Dragons Fight Ten Bald Assassins",
		"Dynamic Flavors That Bring Amazement",
	];

	return pickRandom(dftba);
}
