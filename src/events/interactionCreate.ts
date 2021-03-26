/* If you're self-hosting Steve, you'll have to register these slash commands yourself! There's a tool to do so at
* https://github.com/tuataria/slash, although you might have to modify it to fit your specific needs.
*/
import { Event } from 'klasa';
import { Events } from '@lib/types/Enums';
import { inspect } from 'util';
import { InteractionCreatePacket } from '@lib/types/Interactions';

export default class extends Event {

	public run(data: InteractionCreatePacket) {
		switch (data.data.name) {
			case 'dftba':
				this.client.emit(Events.DftbaSlash, data);
				break;
			case 'rps':
				this.client.emit(Events.RpsSlash, data);
				break;
			default:
				this.client.console.log(inspect(data, { depth: 4 }));
		}
	}

}

