import LocaleErrorNotification from "./error";
import LocaleSuccessNotification from "./success";
import LocaleWarningNotification from "./warning";

type LocaleNotifications = {
    error: LocaleErrorNotification;
    success: LocaleSuccessNotification,
    warning: LocaleWarningNotification;
}

export default LocaleNotifications;