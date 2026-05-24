import { FT, T } from "#utils/i18n";

export const Create = {
	Embed: {
		Title: {
			HasParent: FT<{ name: string; parentName: string; type: string }>("logs/channel:create.embed.title.has_parent"),
			NoParent: FT<{ name: string; type: string }>("logs/channel:create.embed.title.no_parent"),
		},
	},
};

export const Delete = {
	Embed: {
		Title: {
			HasParent: FT<{ name: string; parentName: string; type: string }>("logs/channel:delete.embed.title.has_parent"),
			NoParent: FT<{ name: string; type: string }>("logs/channel:delete.embed.title.no_parent"),
		},
	},
};

export const EmbedFooter = FT<{ id: string }>("logs/channel:embed_footer");

export const Type = {
	Announcement: T("logs/channel:type.announcement"),
	AnnouncementThread: T("logs/channel:type.announcement_thread"),
	Category: T("logs/channel:type.category"),
	Forum: T("logs/channel:type.forum"),
	Media: T("logs/channel:type.media"),
	PrivateThread: T("logs/channel:private_thread"),
	PublicThread: T("logs/channel:type.public_thread"),
	StageVoice: T("logs/channel:type.stage_voice"),
	Text: T("logs/channel:type.text"),
	Unknown: T("logs/channel:type.unknown"),
	Voice: T("logs/channel:type.voice"),
};
