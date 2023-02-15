import LocaleMessageComponentFormLayout from "../../../types/forms/layouts/messageComponents";
import STATIC_VALIDATION from "../staticValidation";

const messageComponent: LocaleMessageComponentFormLayout = {
    labels: {
        createButton: 'New button',
        removeButtons: 'Delete buttons',
        newOption: 'New option',
        removeOptions: 'Delete opções'
    },
    error: {
        stringSelect: {
            options: 'Need more options'
        }
    },
    field: {
        shared: {
            emojiId: {
                label: 'Discord emoji ID',
                placeholder: 'Server emoji id (need emoji reference)',
                validation: {
                    maxLength: STATIC_VALIDATION.maxLength,
                    onlyNumbers: STATIC_VALIDATION.onlyNumbers
                }
            },
            emojiName: {
                label: "Emoji's name",
                placeholder: 'Common emoji "🤓" or discord emoji name (need Emoji ID)',
                validation: {
                    maxLength: STATIC_VALIDATION.maxLength
                }
            },
            emojiAnimated: {
                label: 'Emoji have animation'
            },
            roleId: {
                label: 'Select role',
            },
        },
        selectComponent: {
            label: 'Component type',
            options: {
                BUTTON: 'Buttons',
                STRING_SELECT: 'Role select'
            }
        },
        fieldsButton: {
            style: {
                label: 'Button color',
                options: {
                    PRIMARY: 'Blue',
                    SECONDARY: 'Gray',
                    SUCCESS: 'Green',
                    DANGER: 'Red'
                }
            },
            label: {
                label: 'Button label',
                placeholder: 'Set a name for the button',
                validation: {
                    maxLength: STATIC_VALIDATION.maxLength,
                    required: STATIC_VALIDATION.required
                }
            }
        },
        fieldsStringSelect: {
            maxValues: {
                label: 'Maximum choices',
                placeholder: 'From 1 to 25 the member can select from 1 to 25 job options at a time',
                validation: {
                    pattern: STATIC_VALIDATION.onlyNumbers,
                    minNumber: STATIC_VALIDATION.minNumber,
                    maxNumber: STATIC_VALIDATION.maxNumber,
                    required: STATIC_VALIDATION.required
                }
            },
            placeholder: {
                label: 'Field description',
                placeholder: 'Discord input field description, Ex: Choose your RPG roles...',
                validation: {
                    maxLength: STATIC_VALIDATION.maxLength
                }
            },
            optionLabel: {
                label: 'Option label',
                placeholder: 'The name of one of the job list options',
                validation: {
                    required: STATIC_VALIDATION.required,
                    maxLength: STATIC_VALIDATION.maxLength
                }
            },
            optionDescription: {
                label: 'Role description',
                placeholder: 'Set the description for the selected role',
                validation: {
                    maxLength: STATIC_VALIDATION.maxLength
                }
            }
        },
    }
}

export default messageComponent;