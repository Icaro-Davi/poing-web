type LocaleWarningNotification = {
    modules: {
        welcomeOrLeaveMemberModuleTestMessage: {
            title: string;
            description: string;
        },
        roleByInteraction: {
            invalidMaxValueAndOptionsLength: {
                title: string;
                description: string; // variables {%value1%} {%value2%} {%value3%}
            }
        }
    }
}

export default LocaleWarningNotification;