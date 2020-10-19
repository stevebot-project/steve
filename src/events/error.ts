import { Event } from 'klasa';

export default class extends Event {

	public run(err: Error) {
		this.client.console.error(err);
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	public async init() {
		if (!this.client.options.consoleEvents.error) this.disable();
	}

}
