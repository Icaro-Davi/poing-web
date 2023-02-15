import { BOT } from "../../defaultBoTInfo";
import LocalePoingSettingsForm from "../../types/forms/poingSettings";
import STATIC_VALIDATION from "./staticValidation";

const poingSettings: LocalePoingSettingsForm = {
    title: `Configurações do ${BOT.name}`,
    submitButtonLabel: 'Atualizar',
    field: {
        prefix: {
            label:  `Prefixo do ${BOT.name}`,
            validation: {
                required: STATIC_VALIDATION.required,
                maxLength: STATIC_VALIDATION.maxLength,
                patternPrefix: 'Prefixos validos (!@#$%&*-_=+.:?)'
            }
        },
        messageEmbedHexColor: {
            label: 'Cor das mensagens',
            validation: {
                required: STATIC_VALIDATION.required,
                patternHexColor: 'Precisa ser uma cor em hexadecimal.'
            }
        },
        locale: {
            label: 'Tradução',
            validation: {
                required: STATIC_VALIDATION.required
            }
        }
    }
}

export default poingSettings;