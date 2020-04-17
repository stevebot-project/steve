import { Serializer } from 'klasa';

export default class extends Serializer {

	public async deserialize(data: string): Promise<string> {
		const segments = ['work', 'short', 'long'];
		if (!segments.includes(data)) throw 'Invalid pomodoro segment!';
		return data;
	}

	public serialize(value: string): string {
		return value;
	}

}
