import styled, { css } from "styled-components";
import { StrokeTextType, StyledParagraphType, StyledTitlePropsType } from "./styled.types";

export const StrokeText = ({ textColor, strokeColor, strokeSize = 1, shadowColor, shadowBlur = 3, shadowX = 3, shadowY = 3 }: StrokeTextType) => css`
    color: ${props => textColor || props.theme.colors.white};
    text-shadow:
    ${strokeSize}px ${strokeSize}px 0 ${strokeColor},
    ${-strokeSize}px ${strokeSize}px 0 ${strokeColor},
    ${strokeSize}px ${-strokeSize}px 0 ${strokeColor},
    ${-strokeSize}px ${-strokeSize}px 0 ${strokeColor},
    ${shadowX}px ${shadowY}px ${shadowBlur}px ${props => shadowColor || props.theme.colors.black};
`;

const TitleDefaultStyle = css<StyledTitlePropsType>`
    font-family: 'pattaya', sans-serif;
    font-weight: lighter;
    ${props => {
        switch (props.spacing) {
            case 'lg':
                return `margin-bottom: 1.5rem;`;
            case 'md':
                return `margin-bottom: 1rem;`;
            case 'sm':
                return `margin-bottom: .5rem;`;
            default:
                return;
        }
    }}
    ${props => props.stroke && StrokeText({ strokeColor: props.theme.colors.secondary, ...typeof props?.stroke === 'string' ? {} : props?.stroke })}
`;

export const StyledTitleOne = styled.h1`
    ${TitleDefaultStyle}
    font-size: clamp(3rem, 5vw, 3.5rem);
`;

export const StyledTitleTwo = styled.h2`
    ${TitleDefaultStyle}
    font-size: clamp(2.5rem, 2.5vw, 3rem);
`;

export const StyledParagraph = styled.p<StyledParagraphType>`
    font-family: 'Roboto', sans-serif;
    font-size: clamp(1rem, 1.2vw, 1.5rem);
    ${props =>
        props.stroke && StrokeText({
            strokeColor: props.theme.colors.secondary,
            shadowBlur:2, shadowX: 1, shadowY: 1,
            ...typeof props?.stroke === 'string' ? {} : props.stroke
        })
    }
`;