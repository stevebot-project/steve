import { FT, T } from "#utils/i18n";

export const EvalError = FT<{ result: string; time: string }>("commands/system:eval_error");
export const EvalOutput = FT<{ result: string; time: string }>("commands/system:eval_output");
export const EvalSendConsole = FT<{ time: string }>("commands/system:eval_send_console");
export const FeedbackModalInputLabel = T("commands/system:feedback_modal_input_label");
export const FeedbackModalInputPlaceholder = T("commands/system:feedback_modal_input_placeholder");
export const FeedbackModalTitle = T("commands/system:feedback_modal_title");
export const FeedbackSubmissionFailure = T("commands/system:feedback_submission_failure");
export const FeedbackSubmissionSuccess = T("commands/system:feedback_submission_success");
export const PingSuccess = FT<{ latency: number }>("commands/system:ping_success");
export const SetMemberlogAlreadyExists = FT<{ mention: string }>("commands/system:set_memberlog_already_exists");
export const SetMemberlogSuccess = FT<{ mention: string }>("commands/system:set_memberlog_success");
export const SetServerlogAlreadyExists = FT<{ mention: string }>("commands/system:set_serverlog_already_exists");
export const SetServerlogSuccess = FT<{ mention: string }>("commands/system:set_serverlog_success");
