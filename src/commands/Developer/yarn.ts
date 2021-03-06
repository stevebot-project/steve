import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { ImageAssets } from '@lib/types/Enums';
import { ApplyOptions } from '@skyra/decorators';
import { formatDate, sendLoadingMessage } from '@utils/util';
import axios from 'axios';
import { MessageEmbed } from 'discord.js';
import { CommandOptions, KlasaMessage } from 'klasa';

@ApplyOptions<CommandOptions>({
	aliases: ['npm'],
	cooldown: 30,
	cooldownLevel: 'author',
	description: lang => lang.tget('commandYarnDescription'),
	extendedHelp: lang => lang.tget('commandYarnExtended'),
	requiredPermissions: ['ATTACH_FILES', 'EMBED_LINKS'],
	usage: '<package:string>'
})
export default class extends SteveCommand {

	private yarnUrl = 'https://registry.yarnpkg.com';

	public async run(msg: KlasaMessage, [pkg]: [string]) {
		const response = await sendLoadingMessage(msg);
		try {
			const { data } = await axios.get<YarnPackage>(`${this.yarnUrl}/${pkg.toLowerCase()}`);

			const embedData = msg.language.tget('commandYarnEmbed');

			const embed = new MessageEmbed()
				.setDescription(embedData.description(data.author?.name, data.description, data.license))
				.setFooter(embedData.footer(data['dist-tags'].latest, formatDate(new Date(data.time[data['dist-tags'].latest]))))
				.setThumbnail(ImageAssets.NodeJs)
				.setTitle(data.name)
				.setTimestamp()
				.setURL(`https://yarnpkg.com/en/package/${data.name}`);

			return response.edit(undefined, embed);
		} catch {
			return response.edit(msg.language.tget('commandYarnPackageNotFound', pkg), { embed: null });
		}
	}

}

interface YarnPackage {
	author?: Author;
	bugs: Record<'url', string>;
	description: string;
	'dist-tags': DistTags;
	homepage: string;
	_id: string;
	license: string;
	maintainers: Maintainer[];
	name: string;
	readme: string;
	readmeFilename: string;
	repository: Repository;
	_rev: string;
	time: Record<string, string>;
	versions: Record<string, VersionInfo>;
}

interface DistTags extends Record<string, unknown> {
	latest: string;
}

interface Author {
	name: string;
	url?: string;
}

interface Repository {
	type: 'git' | 'svn';
	url: string;
}

interface VersionInfo {
	name: string;
	description: string;
	author: Author;
	version: string;
	main: string;
	license: string;
	homepage: string;
	engines: Record<string, string>;
	repository: Repository;
	bugs: Record<'url', string>;
	keywords: string[];
	publishConfig: Record<string, string>;
	gitHead: string;
	dist: Record<string, string>;
	maintainers: Maintainer[];
	directories: Record<string, string>;
	dependencies?: Record<string, string>;
	deprecated?: string;
}

interface Maintainer {
	name: string;
	email: string;
	url?: string;
}
