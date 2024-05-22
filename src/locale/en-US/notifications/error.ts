import { BOT } from "../../defaultBoTInfo";
import LocaleErrorNotification from "../../types/notifications.ts/error";

const Error: LocaleErrorNotification = {
    shared: {
        unexpectedError: {
            title: 'An unexpected error occurred',
            description: 'If the error persists contact us on Discord to report the bug.'
        }
    },
    account: {
        logout: {
            title: 'Logout',
            description: 'Error when trying to logout.'
        },
        getMe: {
            title: 'Search user',
            description: 'User not found.'
        }
    },
    guilds: {
        find: {
            title: 'Search guild',
            description: 'Error on try to find guild, guild not found.'
        }
    },
    bot: {
        getSettings: {
            title: `${BOT.name}'s settings.`,
            description: `Error on try to find ${BOT.name}'s settings.`
        },
        updateSettings: {
            title: 'Erro ლ(ಥ益ಥლ)',
            description: `Error on try to update ${BOT.name}' settings.`,
        }
    },
    modules: {
        updateModuleActivity: {
            title: 'Module activity',
            description: 'Failed to change module activity'
        },
        getWelcomeOrLeaveMemberSettings: {
            title: 'Error on search settings',
            description: 'Error on try to search settings.'
        },
        updateWelcomeOrLeaveMemberSettings: {
            title: 'Error on update',
            description: 'Erro on try to update settings.'
        }
    }
}

export default Error;