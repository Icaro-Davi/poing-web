import { LocaleFormField } from "..";

type LocaleMessageComponentFormLayout = {
    labels: {
        createButton: string;
        removeButtons: string;
        newOption: string;
        removeOptions: string;
    };
    error: {
        stringSelect: {
            options: string;
        };
    };
    field: {
        shared: {
            emojiId: LocaleFormField;
            emojiName: LocaleFormField;
            emojiAnimated: {
                label: string;
            },
            roleId: {
                label: string;
            },
        },
        selectComponent: {
            label: string;
            options: {
                BUTTON: string;
                STRING_SELECT: string;
            }
        },
        fieldsButton: {
            style: {
                label: string;
                options: {
                    PRIMARY: string;
                    SECONDARY: string;
                    SUCCESS: string;
                    DANGER: string;
                }
            },
            label: LocaleFormField;
        },
        fieldsStringSelect: {
            maxValues: LocaleFormField<{
                pattern: string;
            }>;
            placeholder: LocaleFormField;
            optionLabel: LocaleFormField;
            optionDescription: LocaleFormField;
        },
    }
}

export default LocaleMessageComponentFormLayout;