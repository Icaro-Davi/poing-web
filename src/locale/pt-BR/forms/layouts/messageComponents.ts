import LocaleMessageComponentFormLayout from "../../../types/forms/layouts/messageComponents";
import STATIC_VALIDATION from "../staticValidation";

const messageComponent: LocaleMessageComponentFormLayout = {
    labels: {
        createButton: 'Novo botão',
        removeButtons: 'Remover botões',
        newOption: 'Nova opção',
        removeOptions: 'Remover opções'
    },
    error: {
        stringSelect: {
            options: 'Precisa adicionar mais opções'
        }
    },
    field: {
        shared: {
            emojiId: {
                label: 'ID do emoji do Discord',
                placeholder: 'Id do emoji do servidor (precisa da referência do emoji)',
                validation: {
                    maxLength: STATIC_VALIDATION.maxLength,
                    onlyNumbers: STATIC_VALIDATION.onlyNumbers
                }
            },
            emojiName: {
                label: 'Referência do emoji',
                placeholder: 'Emoji comum "🤓" ou nome do emoji do discord (precisa do ID do Emoji)',
                validation: {
                    maxLength: STATIC_VALIDATION.maxLength
                }
            },
            emojiAnimated: {
                label: 'Emoji possui animação'
            },
            roleId: {
                label: 'Selecione o cargo',
            },
        },
        selectComponent: {
            label: 'Tipo de componente',
            options: {
                BUTTON: 'Lista de botões',
                STRING_SELECT: 'Seleção de cargos'
            }
        },
        fieldsButton: {
            style: {
                label: 'Estilo do botão',
                options: {
                    PRIMARY: 'Azul',
                    SECONDARY: 'Cinza',
                    SUCCESS: 'Verde',
                    DANGER: 'Vermelho'
                }
            },
            label: {
                label: 'Nome do botão',
                placeholder: 'Defina um nome para o botão',
                validation: {
                    maxLength: STATIC_VALIDATION.maxLength,
                    required: STATIC_VALIDATION.required
                }
            }
        },
        fieldsStringSelect: {
            maxValues: {
                label: 'Máximo de escolhas',
                placeholder: 'De 1 a 25 o membro poderá selecionar de 1 a 25 opções de cargos por vez',
                validation: {
                    pattern: STATIC_VALIDATION.onlyNumbers,
                    minNumber: STATIC_VALIDATION.minNumber,
                    maxNumber: STATIC_VALIDATION.maxNumber,
                    required: STATIC_VALIDATION.required
                }
            },
            placeholder: {
                label: 'Descrição do campo',
                placeholder: 'Descrição do campo de entrada do Discord, Ex: Escolha suas funções de RPG...',
                validation: {
                    maxLength: STATIC_VALIDATION.maxLength
                }
            },
            optionLabel: {
                label: 'Nome da opção',
                placeholder: 'O nome de uma das opções da lista de cargos',
                validation: {
                    required: STATIC_VALIDATION.required,
                    maxLength: STATIC_VALIDATION.maxLength
                }
            },
            optionDescription: {
                label: 'Descrição do cargo',
                placeholder: 'Defina a descrição para o cargo selecionado',
                validation: {
                    maxLength: STATIC_VALIDATION.maxLength
                }
            }
        },
    }
}

export default messageComponent;