import { FT, T } from "#utils/i18n";

export const EmbedDisplayNameField = T("logs/guildmember:embed_display_name_field");
export const EmbedMemberAddFieldName = T("logs/guildmember:embed_member_add_field_name");
export const EmbedMemberAddFieldValue = FT<{ duration: string }>("logs/guildmember:embed_member_add_field_value");
export const EmbedMemberIDFooter = FT<{ id: string }>("logs/guildmember:embed_member_id_footer");
export const EmbedMemberRemoveDurationFieldName = T("logs/guildmember:embed_member_remove_duration_field_name");
export const EmbedMemberRemoveDurationFieldValue = FT<{ duration: string }>(
	"logs/guildmember:embed_member_remove_duration_field_value",
);
export const EmbedMemberRemoveRolesFieldName = T("logs/guildmember:embed_member_remove_roles_field_name");
export const EmbedMemberRemoveRolesFieldNone = T("logs/guildmember:embed_member_remove_roles_field_none");
export const EmbedTitleRoleAdded = FT<{ role: string; executor: string }>("logs/guildmember:embed_title_role_added");
export const EmbedTitleRoleRemoved = FT<{ role: string; executor: string }>(
	"logs/guildmember:embed_title_role_removed",
);
