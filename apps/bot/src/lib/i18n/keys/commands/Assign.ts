import { FT } from "#utils/i18n";

export const ErrorAlreadyAssignable = FT<{ name: string }>(
	"commands/assign:error_already_assignable",
);
export const ErrorAlreadyNotAssignable = FT<{ name: string }>(
	"commands/assign:error_already_not_assignable",
);
export const ErrorNotAssignableByBot = FT<{ name: string }>(
	"commands/assign:error_not_assignable_by_bot",
);
export const ErrorNotSelfAssignable = FT<{ name: string }>(
	"commands/assign:error_not_self_assignable",
);
export const ErrorRoleNotFound = FT<{ name: string }>(
	"commands/assign:error_role_not_found",
);
export const ErrorUnableToAssign = FT<{ name: string }>(
	"commands/assign:error_unable_to_assign",
);
export const SuccessRoleAssigned = FT<{ name: string }>(
	"commands/assign:success_role_assigned",
);
export const SuccessRoleAssignable = FT<{ name: string }>(
	"commands/assign:success_role_assignable",
);
export const SuccessRoleNotAssignable = FT<{ name: string }>(
	"commands/assign:success_role_not_assignable",
);
export const SuccessRoleRemoved = FT<{ name: string }>(
	"commands/assign:success_role_removed",
);
