import { FT, T } from "#utils/i18n";

export const EmbedDisplayNameField = T("logs/guildmember:embed_display_name_field");
export const EmbedMemberIDFooter = FT<{ id: string }>("logs/guildmember:embed_member_id_footer");
export const EmbedTitleRoleAdded = FT<{ role: string; executor: string }>("logs/guildmember:embed_title_role_added");
export const EmbedTitleRoleRemoved = FT<{ role: string; executor: string }>(
	"logs/guildmember:embed_title_role_removed",
);
