import { BOT } from "../../defaultBoTInfo";
import STATIC_VALIDATION from "./staticValidation";

const poingSettings = {
    title: `Configurações do ${BOT.name}`,
    submitButtonLabel: 'Atualizar',
    field: {
        prefix: {
            label:  `Prefixo do ${BOT.name}`,
            validation: {
                required: STATIC_VALIDATION.required,
                maxLength: STATIC_VALIDATION.maxLength
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