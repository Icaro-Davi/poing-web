import { LocaleFormField } from ".";

type LocalePoingSettingsForm = {
    title: string;
    submitButtonLabel: string;
    field: {
        prefix: LocaleFormField<{
            patternPrefix: string;
        }>;
        messageEmbedHexColor: LocaleFormField<{
            patternHexColor: string;
        }>;
        locale: LocaleFormField<{
            required: string;
        }>;
        channelLogsId: LocaleFormField & {
            optionLogsDisabled: string;
        }
    };
}

export default LocalePoingSettingsForm;