import { Language, SchemaPiece, Serializer } from 'klasa';
export default class extends Serializer {

	// eslint-disable-next-line @typescript-eslint/require-await
	public async deserialize(data: string, piece: SchemaPiece, lang: Language): Promise<string> {
		if (data === 'none' || data === 'join' || data === 'role') return data;
		throw lang.tget('serializerTrustedRoleSettingInvalidSetting', data);
	}

	public serialize(value: string): string {
		return value;
	}

}
