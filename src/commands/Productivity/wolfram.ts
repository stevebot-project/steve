import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { ApplyOptions } from '@skyra/decorators';
import { CommandOptions, KlasaMessage } from 'klasa';
import axios from 'axios';
import { TOKENS } from '@root/config';
import { MessageEmbed } from 'discord.js';

@ApplyOptions<CommandOptions>({
	aliases: ['wolfram-alpha', 'math', 'domymathhomework'],
	cooldown: 30,
	cooldownLevel: 'author',
	description: lang => lang.tget('commandWolframDescription'),
	extendedHelp: lang => lang.tget('commandWolframExtended'),
	requiredPermissions: ['EMBED_LINKS'],
	usage: '<query:string>'
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage, [query]: [string]) {
		const loadingMsg = await msg.channel.send(msg.language.tget('commandWolframLoading'));
		const url = `http://api.wolframalpha.com/v1/result?appid=${TOKENS.WOLFRAM}&i=${encodeURIComponent(query)}&units=metric`;

		axios.get(url)
			.then(({ status, data: result }) => {
				if (status !== 200) throw 'Bad Wolfram request';

				const embedData = msg.language.tget('commandWolframEmbed');
				return loadingMsg.edit(new MessageEmbed()
					.setTitle(embedData.title)
					.setDescription(embedData.description)
					.addFields([{
						name: embedData.queryHeader,
						value: query
					}, {
						name: embedData.resultHeader,
						value: result
					}])
					.setFooter(embedData.footer)
					.setThumbnail('https://media.discordapp.net/attachments/723241105323327581/814368531600637968/wolfram-logo.png')
					.setColor('0xDD1100'));
			})
			.catch(() => loadingMsg.edit(msg.language.tget('commandWolframError')));
	}

}
