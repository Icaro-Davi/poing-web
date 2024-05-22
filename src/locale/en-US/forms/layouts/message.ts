import LocaleMessageFormLayout from "../../../types/forms/layouts/message";
import STATIC_VALIDATION from "../staticValidation";

const message: LocaleMessageFormLayout = {
    field: {
        isMessageText: {
            activeLabel: 'Message embed',
            disabledLabel: 'Normal message'
        },
        channelId: {
            label: 'Channel',
        },
        messageText: {
            label: 'Welcome message',
            placeholder: 'Write a welcome message',
            validation: {
                maxLength: STATIC_VALIDATION.maxLength,
                required: STATIC_VALIDATION.required
            }
        },
        messageEmbedAuthorPicture: {
            label: "Author's picture",
        },
        messageEmbedAuthorName: {
            label: "Author's name",
            placeholder: 'Write something...',
            validation: {
                maxLength: STATIC_VALIDATION.maxLength,
            }
        },
        messageEmbedTitle: {
            label: 'Title',
            placeholder: 'Write some cool title...',
            validation: {
                maxLength: STATIC_VALIDATION.maxLength
            }
        },
        messageEmbedDescription: {
            label: 'Description',
            placeholder: 'Write some cool description...',
            validation: {
                maxLength: STATIC_VALIDATION.maxLength,
                required: STATIC_VALIDATION.required
            }
        },
        messageEmbedThumbnail: {
            label: 'Thumbnail',
            placeholder: 'Image URL or {member.picture}',
            validation: {
                maxLength: STATIC_VALIDATION.maxLength,
                pattern: 'Must be a link or bot variable'
            }
        },
        messageEmbedFieldInline: {
            label: 'Inline'
        },
        messageEmbedFieldName: {
            label: "Field title",
            placeholder: 'Field title {%index%}...',
            validation: {
                required: STATIC_VALIDATION.required,
                maxLength: STATIC_VALIDATION.maxLength,
            }
        },
        messageEmbedFieldValue: {
            label: 'Field description',
            placeholder: 'Descrição do campo {%index%}...',
            validation: {
                required: STATIC_VALIDATION.required,
                maxLength: STATIC_VALIDATION.maxLength
            }
        },
        messageEmbedFooter: {
            label: 'Footer',
            placeholder: 'Footer message...',
            validation: {
                maxLength: STATIC_VALIDATION.maxLength
            }
        }
    },
    poingTextVars: {
        '': 'Without avatar',
        '{bot.prefix}': 'Bot prefix',
        '{bot.hexColor}': 'Bot color',
        '{bot.name}': 'Bot name',
        '{bot.@mention}': 'Bot mention',
        '{guild.name}': 'Guild/Community name',
        '{guild.picture}': 'Guild/Community picture',
        '{member.username}': 'Member username',
        '{member.tagNumber}': 'Member discriminator',
        '{member.picture}': 'Member picture',
        '{member.mention}': 'Mention member',
        '{member.joinedAt}': 'Member joined at',
    }
}

export default message;