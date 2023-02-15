import LocaleNotifications from "../../types/notifications.ts";
import error from "./error";
import success from "./success";
import warning from "./warning";

const notifications: LocaleNotifications = {
    error, success, warning
}

export default notifications;