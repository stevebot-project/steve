import { GuildMessage } from '@lib/types/Messages';
import { BitField, Permissions, PermissionString } from 'discord.js';
import { Command, Inhibitor, InhibitorStore, util } from 'klasa';

export default class extends Inhibitor {

	public friendlyPerms: Record<string, unknown>;
	public impliedPermissions: Readonly<BitField<PermissionString>>;

	public constructor(store: InhibitorStore, file: string[], directory: string) {
		super(store, file, directory);
		this.impliedPermissions = new Permissions(515136).freeze();
		// VIEW_CHANNEL, SEND_MESSAGES, SEND_TTS_MESSAGES, EMBED_LINKS, ATTACH_FILES,
		// READ_MESSAGE_HISTORY, MENTION_EVERYONE, USE_EXTERNAL_EMOJIS, ADD_REACTIONS

		this.friendlyPerms = Object.keys(Permissions.FLAGS).reduce((obj, key) => {
			// @ts-ignore 7053
			obj[key] = util.toTitleCase(key.split('_').join(' '));
			return obj;
		}, {});
	}

	public run(msg: GuildMessage, cmd: Command) {
		const missing = msg.channel.type === 'text'
			? msg.channel.permissionsFor(this.client.user!)!.missing(cmd.requiredPermissions, false)
			: this.impliedPermissions.missing(cmd.requiredPermissions, false);

		if (missing.length) throw msg.language.tget('inhibitorMissingBotPerms', missing.map(key => this.friendlyPerms[key]).join(', '));
	}

}
