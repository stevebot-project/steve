import { Serializer } from 'klasa';

export default class extends Serializer {

	public async deserialize(data: string): Promise<string> {
		if (/^#[0-9A-F]{6}$/i.test(data)) return data;
		throw `**${data}** is not a valid hex color.`;
	}

	public serialize(value: string): string {
		return value;
	}

}
