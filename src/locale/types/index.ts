import LocaleCommand from "./command";
import LocaleLayouts from "./layouts";
import LocaleLabels from './labels';
import LocalePages from "./pages";
import LocaleNotifications from "./notifications.ts";
import LocaleForm from "./forms";

type LocaleType = {
    lang: string;
    commands: LocaleCommand[];
    layouts: LocaleLayouts;
    labels: LocaleLabels;
    pages: LocalePages;
    notifications: LocaleNotifications;
    forms: LocaleForm;
}

export default LocaleType;