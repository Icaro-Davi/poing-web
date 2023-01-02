import STATIC_VALIDATION from "./staticValidation";

const welcomeMemberForm = {
    btnNewFieldLabel: 'Novo campo',
    btnRemoveField: 'Remover',
    btnSendSettings: 'Salvar',
    btnTestModule: 'Testar',
    field: {
        isMessageText: {
            activeLabel: 'Ativar mensagem incorporada',
            disabledLabel: 'Ativar mensagem normal'
        },
        channelId: {
            label: 'Usar no canal',
        },
        messageText: {
            label: 'Mensagem de boas vindas',
            placeholder: 'Escreva com uma mensagem de boas vindas',
            validation: {
                maxLength: STATIC_VALIDATION.maxLength,
                required: STATIC_VALIDATION.required
            }
        },
        messageEmbedAuthorPicture: {
            label: 'Foto do autor',
        },
        messageEmbedAuthorName: {
            label: 'Nome do autor',
            placeholder: 'Digite algo...',
            validation: {
                maxLength: STATIC_VALIDATION.maxLength,
            }
        },
        messageEmbedTitle: {
            label: 'Titulo',
            placeholder: 'Escreva um titulo legal...',
            validation: {
                maxLength: STATIC_VALIDATION.maxLength
            }
        },
        messageEmbedDescription: {
            label: 'Descrição',
            placeholder: 'Escreva uma descrição legal...',
            validation: {
                maxLength: STATIC_VALIDATION.maxLength,
                required: STATIC_VALIDATION.required
            }
        },
        messageEmbedFieldInline: {
            label: 'Em Linha'
        },
        messageEmbedFieldName: {
            label: 'Titulo do campo',
            placeholder: 'Titulo do campo {%index%}...',
            validation: {
                required: STATIC_VALIDATION.required,
                maxLength: STATIC_VALIDATION.maxLength,
            }
        },
        messageEmbedFieldValue: {
            label: 'Descrição do campo',
            placeholder: 'Descrição do campo {%index%}...',
            validation: {
                required: STATIC_VALIDATION.required,
                maxLength: STATIC_VALIDATION.maxLength
            }
        },
        messageEmbedFooter: {
            label: 'Rodapé',
            placeholder: 'Mensagem de rodapé...',
            validation: {
                maxLength: STATIC_VALIDATION.maxLength
            }
        }
    },
    poingTextVars: {
        '': 'Sem Avatar',
        '{bot.prefix}': 'Prefixo do bot',
        '{bot.hexColor}': 'Cor tema do bot',
        '{bot.name}': 'Nome do bot',
        '{bot.@mention}': 'Mencionar bot',
        '{guild.name}': 'Nome da guild/servidor',
        '{guild.picture}': 'URL da foto da guild/servidor',
        '{member.username}': 'Nome de usuário do membro',
        '{member.tagNumber}': 'Tag do membro',
        '{member.picture}': 'URL da foto do membro',
        '{member.mention}': 'Mencionar membro',
        '{member.joinedAt}': 'Data em que membro entrou no discord',
    }
}

export default welcomeMemberForm;