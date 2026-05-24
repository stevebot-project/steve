import { FT, T } from "#utils/i18n";

export const Add = {
	Embed: {
		Field: {
			Name: T("logs/guildmember:add.embed.field.name"),
			Value: FT<{ duration: string }>("logs/guildmember:add.embed.field.value"),
		},
	},
};

export const Remove = {
	Embed: {
		DurationField: {
			Name: T("logs/guildmember:remove.embed.duration_field.name"),
			Value: FT<{ duration: string }>("logs/guildmember:remove.embed.duration_field.value"),
		},
		RolesField: {
			Name: T("logs/guildmember:remove.embed.roles_field.name"),
			ValueNone: T("logs/guildmember:remove.embed.roles_field.value_none"),
		},
	},
};

export const Update = {
	DisplayName: {
		Embed: {
			Field: {
				Name: T("logs/guildmember:update.display_name.embed.name"),
			},
		},
	},
	RoleChange: {
		Embed: {
			TitleAdd: FT<{ role: string; executor: string }>("logs/guildmember:update.role_change.embed.title_add"),
			TitleRemove: FT<{ role: string; executor: string }>("logs/guildmember:update.role_change.embed.title_remove"),
		},
	},
};

export const EmbedFooter = FT<{ id: string }>("logs/guildmember:embed_footer");
