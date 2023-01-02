import { Locale } from "../../../locale/index.type";
import { ModulesType } from "../../../services/discord/bot/bot.types";
import { MemberLeaveService, WelcomeMemberService } from "../../../services/discord/modules";
import BaseError from "../../../utils/error/baseError";
import LocalStorage from "../../../utils/localStorage";
import Notification from "../../Notification";

type FetchWelcomeOrLeaveMemberModuleOptions<K extends keyof ModulesType> = {
    locale?: Locale;
    onFetch?: (fetchData: ModulesType[K]) => void;
    moduleType: K;
}

function FetchWelcomeOrLeaveMemberSettings<K extends keyof ModulesType>(options?: FetchWelcomeOrLeaveMemberModuleOptions<K>) {
    return new Promise<ModulesType[K]>((resolve, reject) => {
        if (options?.moduleType === 'memberLeave' || options?.moduleType === 'welcomeMember') {
            const ModuleService = options.moduleType === 'memberLeave' ? MemberLeaveService : WelcomeMemberService;
            ModuleService.getModuleSettings()
                .then(data => {
                    if (typeof data.settings === 'object') {
                        LocalStorage.guild.setModule(options.moduleType, data);
                    }
                    options?.onFetch && options.onFetch(data);
                    resolve(data);
                }).catch(error => {
                    console.error(error);
                    new BaseError({
                        locale: options?.locale,
                        message: `Failed to get module ${options.moduleType} settings`,
                        origin: 'src.components.Form.FetchWelcomeOrLeaveMemberSettings',
                        callback: locale => {
                            Notification.open({
                                title: locale.notifications.error.modules.getWelcomeOrLeaveMemberSettings.title,
                                description: locale.notifications.error.modules.getWelcomeOrLeaveMemberSettings.description,
                                type: 'error'
                            });
                        },
                        error
                    });
                });
        } else {
            reject('Only can call WelcomeModuleType or MemberLeaveType');
        }
    });
}

export default FetchWelcomeOrLeaveMemberSettings;