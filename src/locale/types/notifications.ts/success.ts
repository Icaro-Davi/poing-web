type LocaleSuccessNotification = {
    shared: {
        created: {
            title: string;
            description: string;
        }
    },
    bot: {
        updateSettings: {
            title: string;
            description: string;
        }
    },
    modules: {
        updateMemberOrLeaveModuleSettings: {
            title: string;
            description: string;
        }
    }
}

export default LocaleSuccessNotification;