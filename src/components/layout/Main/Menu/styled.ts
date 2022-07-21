import styled from "styled-components";
import { StrokeText } from "../../../Typography/styled";

const FONT_SIZE = 18;
export const MARGIN = 32;

export const Header = styled.header`
    height: 5rem;
    display: flex;
`;

export const Anchor = styled.a<{ selected?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${FONT_SIZE}px;
    ${props => StrokeText({ strokeColor: props.theme.colors.secondary, textColor: props.theme.colors.white, shadowColor: 'transparent' })}
    ${props => props.selected && StrokeText({ textColor: props.theme.colors.secondary, strokeColor: props.theme.colors.white })}
    &:hover {
        ${props => StrokeText({ textColor: props.theme.colors.secondary, strokeColor: props.theme.colors.white })}
    }
`;