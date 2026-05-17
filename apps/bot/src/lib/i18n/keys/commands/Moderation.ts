import { FT, T } from "#utils/i18n";

export const ErrorGenericFail = FT<{ member: string }>("commands/moderation:error_generic_fail");
export const ErrorInvalidDuration = FT<{ input: string }>("commands/moderation:error_invalid_duration");
export const ErrorNotManageable = FT<{ member: string }>("commands/moderation:error_not_manageable");
export const ErrorNotModeratable = FT<{ member: string }>("commands/moderation:error_not_moderatable");
export const ErrorUnknownMember = T("commands/moderation:error_unknown_member");
export const NicknameReset = FT<{ username: string }>("commands/moderation:nickname_reset");
export const NicknameSuccess = FT<{ username: string; nickname: string }>("commands/moderation:nickname_success");
export const TimeoutErrorMaxDuration = T("commands/moderation:timeout_error_max_duration");
export const TimeoutSuccess = FT<{ member: string; duration: string }>("commands/moderation:timeout_success");
