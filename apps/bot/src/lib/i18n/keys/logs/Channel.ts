import { FT, T } from "#utils/i18n";

export const TypeText = T("logs/channel:type_text");
export const TypeVoice = T("logs/channel:type_voice");
export const TypeCategory = T("logs/channel:type_category");
export const TypeAnnouncement = T("logs/channel:type_announcement");
export const TypeAnnouncementThread = T("logs/channel:type_announcement_thread");
export const TypePublicThread = T("logs/channel:type_public_thread");
export const TypePrivateThread = T("logs/channel:type_private_thread");
export const TypeStageVoice = T("logs/channel:type_stage_voice");
export const TypeForum = T("logs/channel:type_forum");
export const TypeMedia = T("logs/channel:type_media");
export const TypeUnknown = T("logs/channel:type_unknown");
export const CreateEmbedTitleNoParent = FT<{ name: string; type: string }>("logs/channel:create_embed_title_no_parent");
export const CreateEmbedTitleHasParent = FT<{ name: string; parentName: string; type: string }>(
	"logs/channel:create_embed_title_has_parent",
);
export const DeleteEmbedTitleHasParent = FT<{ name: string; parentName: string; type: string }>(
	"logs/channel:delete_embed_title_has_parent",
);
export const DeleteEmbedTitleNoParent = FT<{ name: string; type: string }>("logs/channel:delete_embed_title_no_parent");
export const EmbedFooter = FT<{ id: string }>("logs/channel:embed_footer");
