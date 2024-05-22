import { FC } from "react";
import { toHTML } from "discord-markdown";
import styled from "styled-components";

export const TITLE_TEXT_COLOR = '#FAFAFA';
export const NORMAL_TEXT_COLOR = '#DCDDDE';

const MarkdownContainer = styled.div`
    color: ${NORMAL_TEXT_COLOR};
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    word-wrap: break-word;

    code {
        display: block;
        font-size: 0.875rem;
        line-height: 1.125rem;
        text-indent: 0;
        white-space: pre-wrap;
        background-color: #2f3136;
        border: 1px solid #202225;
        border-radius: 4px;
        padding: 0.5rem;
        max-width: 80%;
        margin-top: .4rem;
    }

    pre {
        display: inline-block;
    }

    pre code {
        background-color: #202225;
        width: auto;
        height: auto;
        padding: 0.2em;
        margin: -0.2em 0;
        border-radius: 3px;
        font-size: 85%;
        text-indent: 0;
        border: none;
        white-space: pre-wrap;

        line-height: unset;
        max-width: unset;
    }

    strong {
        color: ${TITLE_TEXT_COLOR};
        font-weight: 600;
        margin-bottom: 2px;
    }
    span.mention {
        padding: 0 2px;
        border-radius: 3px;
        font-weight: 500;
        background-color: #4e4d73;
    }
    blockquote {
        padding: 0 .6rem 0 1rem;
        border-left: 4px solid #F2F2F2F2;
        border-radius: 4px;
    }
    .d-spoiler {
        cursor: pointer;
        position: relative;

        ::after {
            content: '';
            display: block;
            position: absolute;
            z-index: 10;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background-color: #202225;
            border-radius: 3px;
            transform: scale(1.06);
        }
        :hover:after {
            background-color: transparent;
        }
    }
`;

const DiscordMarkdown: FC<{ children: string }> = props => (
    <MarkdownContainer className="field-value" dangerouslySetInnerHTML={{
        __html: toHTML(props.children, {
            discordCallback: {
                user: node => '<span class="mention">@User</span>',
                channel: node => '<span class="mention">#Channel</span>',
                everyone: () => '<span class="mention">@everyone</span>',
                here: () => '<span class="mention">@here</span>',
                role: node => '<span class="mention">@Role</span>'
            }
        })
    }} />
);

export default DiscordMarkdown;