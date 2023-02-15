import LocaleWarningNotification from "../../types/notifications.ts/warning";

const warnings: LocaleWarningNotification = {
    modules: {
        welcomeOrLeaveMemberModuleTestMessage: {
            title: 'Test message',
            description: 'Could not test the message as there are errors in the form, please correct and try again!.'
        },
        roleByInteraction: {
            invalidMaxValueAndOptionsLength: {
                title: "Add more options",
                description: 'You have added the value {%value1%} to the maximum choices and have only {%value2%} option(s) added. Add {%value3%} more option(s)!' // variables {%value1%} {%value2%} {%value3%}
            }
        }
    }
}

export default warnings;