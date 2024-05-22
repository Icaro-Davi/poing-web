import { LocaleAutocompleteVars, LocaleFormField } from "..";

type LocaleMessageFormLayout = {
    field: {
        isMessageText: {
            activeLabel: string;
            disabledLabel: string;
        };
        channelId: {
            label: string;
        };
        messageText: LocaleFormField;
        messageEmbedAuthorPicture: {
            label: string;
        };
        messageEmbedAuthorName: LocaleFormField;
        messageEmbedTitle: LocaleFormField<{
            maxLength: string;
        }>;
        messageEmbedDescription: LocaleFormField;
        messageEmbedThumbnail: LocaleFormField<{
            pattern: string;
        }>;
        messageEmbedFieldInline: {
            label: string;
        },
        messageEmbedFieldName: LocaleFormField; // [placeholder {%index%}]
        messageEmbedFieldValue: LocaleFormField; // [placeholder {%index%}]
        messageEmbedFooter: LocaleFormField;
    };
    poingTextVars: LocaleAutocompleteVars;
}

export default LocaleMessageFormLayout;