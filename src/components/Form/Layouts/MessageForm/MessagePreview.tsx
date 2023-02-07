import dynamic from 'next/dist/shared/lib/dynamic';
import { FC, Fragment } from 'react';
import useBotInfo from '../../../../hooks/useBotInfo';
import { BOT } from '../../../../locale/defaultBoTInfo';
import { MessageType } from '../../../../services/discord/modules/modules.types';
import LocalStorage from '../../../../utils/localStorage';
import replaceVarsInString from '../../../../utils/replaceVarsInString';
import DiscordMarkdown from '../../../DiscordEmbedMessage/Markdown';

const DiscordEmbedMessage = dynamic(async () => import("../../../DiscordEmbedMessage"));

type MessagePreviewProps = {
    message: MessageType;
    disableReplaceBotVars?: boolean;
}

const MessagePreview: FC<MessagePreviewProps> = (props) => {
    const botSettings = LocalStorage.bot.getSettings();
    const botInfo = useBotInfo();

    const message: MessageType = props.disableReplaceBotVars
        ? props.message
        : JSON.parse(replaceVarsInString(JSON.stringify(props.message), {
            ...botInfo,
            bot: { ...botInfo.bot, '@menton': `@${BOT.name}` },
        }));

    const checkEmbedMessageIsEmpty = () => {
        const isEmpty = (data: any): boolean => {
            return Object.keys(data ?? {}).some((key: string) => {
                let value = data?.[key];
                if (typeof value === 'object')
                    return (Array.isArray(value)
                        ? !!value.length
                        : Object.entries(value).length
                            ? isEmpty(value)
                            : false);
                return !!value;
            });
        }

        return isEmpty(message.messageEmbed);
    }

    return (
        <Fragment>
            {message && !message.isMessageText && checkEmbedMessageIsEmpty() && (
                <div style={{ width: '100%', height: '100%', maxHeight: 200, overflow: 'auto', backgroundColor: '#424549', padding: '.6rem' }}>
                    <DiscordEmbedMessage
                        borderSideColor={botSettings?.bot.messageEmbedHexColor ?? botInfo.bot.hexColor}
                        title={message?.messageEmbed?.title}
                        description={message?.messageEmbed?.description}
                        author={message?.messageEmbed?.author}
                        thumbnail={message?.messageEmbed?.thumbnail}
                        fields={message?.messageEmbed?.fields}
                        footer={message?.messageEmbed?.footer}
                    />
                </div>
            )}
            {message?.isMessageText && message.messageText && (
                <div style={{ width: '100%', height: '100%', maxHeight: 200, overflow: 'auto', backgroundColor: '#424549', padding: '.6rem' }}>
                    <DiscordMarkdown>{message?.messageText ?? ''}</DiscordMarkdown>
                </div>
            )}
        </Fragment>
    );
}

export default MessagePreview;