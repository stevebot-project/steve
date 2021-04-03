/* If you're self-hosting Steve, you'll have to register these slash commands yourself! There's a tool to do so at
* https://github.com/tuataria/slash, although you might have to modify it to fit your specific needs.
*/
import { Event } from 'klasa';
import { ApplicationCommands } from '@lib/types/Enums';
import { inspect } from 'util';
import { Interaction } from '@lib/types/Interactions';

export default class extends Event {

	public run(interaction: Interaction) {
		switch (interaction.data!.name) {
			case 'assign':
				this.client.emit(ApplicationCommands.Assign, interaction);
				break;
			case 'avatar':
				this.client.emit(ApplicationCommands.Avatar, interaction);
				break;
			case 'convert':
				this.client.emit(ApplicationCommands.Convert, interaction);
				break;
			case 'dftba':
				this.client.emit(ApplicationCommands.Dftba, interaction);
				break;
			case 'rps':
				this.client.emit(ApplicationCommands.Rps, interaction);
				break;
			case 'whois':
				this.client.emit(ApplicationCommands.Whois, interaction);
				break;
			default:
				this.client.console.log(inspect(interaction, { depth: 4 }));
		}
	}

}

