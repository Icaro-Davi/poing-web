import { FC, Fragment } from "react";
import { WelcomeModuleType } from "../../services/discord/modules/modules.types";
import { GetReference } from "../../utils/general.types";
import Img from "../Img";
import { EmbedMessage } from "./styled";
import DiscordMarkdown from './Markdown';

type MessageEmbed = GetReference<WelcomeModuleType, 'messageEmbed'>;
type FieldType = { name: string; value: string; inline?: boolean; };

interface ReactMDProps extends Partial<NonNullable<MessageEmbed>> {
    borderSideColor?: string;
}

const CreateFields: FC<{ fields: FieldType[] }> = props => {
    let currentGridCount = '';
    const fields: (FieldType & { gridColumn: string })[] = props.fields.map(field => {
        if (field.inline) {
            switch (currentGridCount) {
                case '': currentGridCount = '1/5'; break;
                case '1/5': currentGridCount = '5/9'; break;
                case '5/9': currentGridCount = '9/13'; break;
                case '9/13': currentGridCount = '1/5'; break;
            }
            return {
                ...field, gridColumn: currentGridCount
            }
        } else {
            currentGridCount = '';
            return { ...field, gridColumn: '1/13' }
        }
    });
    return (
        <Fragment>
            {fields.map((field, i) => (
                <div key={`field-item-${i}`} className="field-item" style={{ gridColumn: field.gridColumn }}>
                    <div>{field.name}</div>
                    <div className="field-value">
                        <DiscordMarkdown>{field.value}</DiscordMarkdown>
                    </div>
                </div>
            ))}
        </Fragment>
    )
}

const DiscordEmbedMessage: FC<ReactMDProps> = props => {
    const handleImage = (textVar?: string) => {
        if (!textVar) return;
        if (textVar.startsWith('https')) {
            return textVar;
        } else {
            return '/image/discord-user.png';
        }
    }

    const thumbnail = handleImage(props.thumbnail);
    const authorImage = handleImage(props.author?.picture);

    return (
        <EmbedMessage sideBorderColor={props.borderSideColor}>
            <div className='container'>
                {props.author && (
                    <div className="author">
                        {authorImage && props.author.name && (
                            <div className="image-author">
                                <Img alt="Embed user author" imageSrc={authorImage} />
                            </div>
                        )}
                        <div>{props.author.name}</div>
                    </div>
                )}
                {props.title && (
                    <div className="title">
                        {props.title}
                    </div>
                )}
                {props.description && (
                    <div className="description">
                        <DiscordMarkdown>{props.description}</DiscordMarkdown>
                    </div>
                )}
                {props.fields && (
                    <div className="fields">
                        <CreateFields fields={props.fields} />
                    </div>
                )}
                {thumbnail && (
                    <div className="thumbnail">
                        <img style={{ objectFit: 'fill', width: '100%' }} alt="Discord User" src={thumbnail} />
                    </div>
                )}
                {props.footer && (
                    <div className="footer">
                        {props.footer}
                    </div>
                )}
            </div>
        </EmbedMessage>
    );
}

export default DiscordEmbedMessage;