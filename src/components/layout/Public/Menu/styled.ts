import styled from "styled-components";
import { StrokeText } from "../../../Typography/styled";

const FONT_SIZE = 18;
export const MARGIN = 32;
export const HORIZONTAL_HEADER_HEIGHT = '5em';

export const Header = styled.header`
    height: ${HORIZONTAL_HEADER_HEIGHT};
    display: flex;
    position: fixed;
    width: 100%;
    z-index: 10;
    backdrop-filter: blur(5px);
    background-color:${props => props.theme.colors.black}05;
    box-shadow: 0 -8px 10px black;
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