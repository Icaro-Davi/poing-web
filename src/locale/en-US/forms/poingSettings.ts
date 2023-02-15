import { BOT } from "../../defaultBoTInfo";
import LocalePoingSettingsForm from "../../types/forms/poingSettings";
import STATIC_VALIDATION from "./staticValidation";

const poingSettings: LocalePoingSettingsForm = {
    title: `${BOT.name}'s settings`,
    submitButtonLabel: 'Update',
    field: {
        prefix: {
            label:  `${BOT.name}'s prefix`,
            validation: {
                required: STATIC_VALIDATION.required,
                maxLength: STATIC_VALIDATION.maxLength,
                patternPrefix: 'Valid prefixeis (!@#$%&*-_=+.:?)'
            }
        },
        messageEmbedHexColor: {
            label: 'Embed color',
            validation: {
                required: STATIC_VALIDATION.required,
                patternHexColor: 'Need a hexadecimal color value.'
            }
        },
        locale: {
            label: 'Language',
            validation: {
                required: STATIC_VALIDATION.required
            }
        }
    }
}

export default poingSettings;