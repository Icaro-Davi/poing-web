import LocalePoingSettingsForm from "./poingSettings";
import LocaleStaticValidation from "./staticValidation";
import LocaleMessageFormLayout from "./layouts/message";
import LocaleMessageComponentFormLayout from "./layouts/messageComponents";

export type LocaleFormField<V = {}> = {
    label: string;
    placeholder?: string;
    validation: V & Partial<LocaleStaticValidation>;
}

export type LocaleAutocompleteVars = {
    '': string;
    '{bot.prefix}': string;
    '{bot.hexColor}': string;
    '{bot.name}': string;
    '{bot.@mention}': string;
    '{guild.name}': string;
    '{guild.picture}': string;
    '{member.username}': string;
    '{member.tagNumber}': string;
    '{member.picture}': string;
    '{member.mention}': string;
    '{member.joinedAt}': string;
}

type LocaleForm = {
    poingSettings: LocalePoingSettingsForm;
    layouts: {
        message: LocaleMessageFormLayout;
        messageComponents: LocaleMessageComponentFormLayout;
    }
}

export default LocaleForm;