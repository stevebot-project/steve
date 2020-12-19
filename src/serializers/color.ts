import { Language, SchemaPiece, Serializer } from 'klasa';

export default class extends Serializer {

	// eslint-disable-next-line @typescript-eslint/require-await
	public async deserialize(data: string, piece: SchemaPiece, lang: Language): Promise<string> {
		if (/^#[0-9A-F]{6}$/i.test(data)) return data;
		throw lang.tget('SERIALIZER_COLOR_INVALID_HEX', data);
	}

	public serialize(value: string): string {
		return value;
	}

}
