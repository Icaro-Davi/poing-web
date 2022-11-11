import { Locale } from "../../../locale/index.type";
import { WelcomeMemberService } from "../../../services/discord/modules";
import { WelcomeModuleType } from "../../../services/discord/modules/modules.types";
import BaseError from "../../../utils/error/baseError";
import LocalStorage from "../../../utils/localStorage";
import Notification from "../../Notification";

type FetchWelcomeModuleType = {
    isActive: boolean;
    settings: WelcomeModuleType;
}
type FetchWelcomeModuleOptions = {
    locale?: Locale;
    onFetch?: (fetchData: FetchWelcomeModuleType) => void;
}

const FetchWelcomeMemberSettings = (options?: FetchWelcomeModuleOptions) => {
    return new Promise<FetchWelcomeModuleType>((resolve, reject) => {
        WelcomeMemberService.getModuleSettings()
            .then(data => {
                const botSettings = LocalStorage.bot.getSettings();
                if (botSettings) {
                    botSettings!.modules.welcomeMember = data;
                    LocalStorage.bot.setSettings(botSettings);
                }
                options?.onFetch && options.onFetch(data);
                resolve(data);
            }).catch(error => {
                console.log(error);
                new BaseError({
                    locale: options?.locale,
                    message: 'Failed to get module welcome member settings',
                    origin: 'src.components.Form.WelcomeMemberForm',
                    callback: locale => {
                        Notification.open({
                            title: locale.notifications.error.modules.getWelcomeMemberSettings.title,
                            description: locale.notifications.error.modules.getWelcomeMemberSettings.description,
                            type: 'error'
                        });
                    },
                    error
                });
            });
    });
}

export default FetchWelcomeMemberSettings;