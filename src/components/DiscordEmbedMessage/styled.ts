import styled from "styled-components";
import { NORMAL_TEXT_COLOR, TITLE_TEXT_COLOR } from "./Markdown";

const NORMAL_TEXT_WEIGHT = `font-weight: 100;`;
const MARGIN_TOP = '8px';

type DiscordEmbedMessageContainerProps = {
    sideBorderColor?: string;
}

export const EmbedMessage = styled.article<DiscordEmbedMessageContainerProps>`
    max-width: 516px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    word-wrap: break-word;

    .container {
        background-color: #36393e;
        border-left: 4px solid ${props => props.sideBorderColor ?? props.theme.colors.secondary};
        border-radius: 4px;
        padding: .5rem 1rem 1rem .75rem;
        max-width: max-content;
        display: grid;
        grid-auto-rows: auto;
        line-height: 1.375rem;

        .thumbnail {
            position: relative;
            width: 80px; height: 80px;
            margin-top: ${MARGIN_TOP}; margin-left: 16px;
            grid-column: 2/2; grid-row: 1/8;
            justify-self: end;
        }
        :has(.thumbnail){
            grid-template-columns: auto min-content;
        }

        .title {
            margin-top: ${MARGIN_TOP};
            color: ${TITLE_TEXT_COLOR};
            grid-column: 1/1;
            font-weight: 600;
        }

        .description {
            grid-column: 1/1;
            color: ${NORMAL_TEXT_COLOR};
            ${NORMAL_TEXT_WEIGHT}
            margin-top: ${MARGIN_TOP};
        }

        .author {
            display: flex;
            grid-column: 1/1;
            margin-top: ${MARGIN_TOP};

            .image-author {
                position: relative;
                width: 24px; height: 24px;
                border-radius: 100%;
                overflow: hidden;
                margin-right: ${MARGIN_TOP};
                flex-shrink: 0;
            }
            div:last-child {
                color: ${TITLE_TEXT_COLOR};
                font-weight: 600;
            }
        }

        .fields {
            display: grid;
            margin-top: ${MARGIN_TOP};
            grid-gap: 8px;

            .field-item {
                display: flex;
                flex-flow: column;
                font-size: 0.875rem;
                line-height: 1.125rem;
                min-width: 0;
                div {
                    color: ${TITLE_TEXT_COLOR};
                    font-weight: 600;
                    margin-bottom: 2px;
                }
                .field-value {
                    color: ${NORMAL_TEXT_COLOR};
                    line-height: 1.125rem;
                    white-space: pre-line;
                    min-width: 0;
                    ${NORMAL_TEXT_WEIGHT}
                }
            }
        }
        .footer {
            margin-top: ${MARGIN_TOP};
            color: ${NORMAL_TEXT_COLOR};
            line-height: 1rem;
            font-size: .75rem;
            ${NORMAL_TEXT_WEIGHT}
        }
    }
`;
