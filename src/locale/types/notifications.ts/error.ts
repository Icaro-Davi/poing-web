type LocaleErrorNotification = {
    shared: {
        unexpectedError: {
            title: string;
            description: string;
        }
    },
    account: {
        logout: {
            title: string;
            description: string;
        },
        getMe: {
            title: string;
            description: string;
        }
    },
    guilds: {
        find: {
            title: string;
            description: string;
        }
    },
    bot: {
        getSettings: {
            title: string;
            description: string;
        },
        updateSettings: {
            title: string;
            description: string;
        }
    },
    modules: {
        updateModuleActivity: {
            title: string;
            description: string;
        },
        getWelcomeOrLeaveMemberSettings: {
            title: string;
            description: string;
        },
        updateWelcomeOrLeaveMemberSettings: {
            title: string;
            description: string;
        }
    }
}

export default LocaleErrorNotification;