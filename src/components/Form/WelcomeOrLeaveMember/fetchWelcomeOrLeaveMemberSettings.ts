import { Locale } from "../../../locale/index.type";
import { GetModuleType } from "../../../services/discord/bot/bot.types";
import { MemberLeaveService, WelcomeMemberService } from "../../../services/discord/modules";
import { MessageType, WelcomeOrLeaveMemberLabelType } from "../../../services/discord/modules/modules.types";
import BaseError from "../../../utils/error/baseError";
import LocalStorage from "../../../utils/localStorage";
import Notification from "../../Notification";

type FetchWelcomeOrLeaveMemberModuleOptions = {
    locale?: Locale;
    onFetch?: (fetchData: GetModuleType<'memberLeave'> | GetModuleType<'welcomeMember'>) => void;
    moduleType: WelcomeOrLeaveMemberLabelType;
}

function FetchWelcomeOrLeaveMemberSettings(options?: FetchWelcomeOrLeaveMemberModuleOptions) {
    return new Promise<MessageType>((resolve, reject) => {
        if (options?.moduleType === 'memberLeave' || options?.moduleType === 'welcomeMember') {
            const ModuleService = options.moduleType === 'welcomeMember' ? MemberLeaveService : WelcomeMemberService;
            ModuleService.getModuleSettings()
                .then(data => {
                    if (typeof data.settings === 'object') {
                        LocalStorage.guild.setModule(options.moduleType, data);
                    }
                    options?.onFetch && options.onFetch(data);
                    resolve(data as MessageType);
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