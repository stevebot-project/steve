import { Serializer } from 'klasa';

export default class extends Serializer {

	// eslint-disable-next-line @typescript-eslint/require-await
	public async deserialize(data: string): Promise<string> {
		if (data === 'none' || data === 'join' || data === 'role') return data;
		throw 'Not a valid setting for GiveTrustedRoleOn!';
	}

	public serialize(value: string): string {
		return value;
	}

}
