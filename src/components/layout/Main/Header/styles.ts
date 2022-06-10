import styled from "styled-components";
import { StrokeCss } from "../../../../styles/globalStyled";

const MARGIN = 32;
const FONT_SIZE = 18;

export const Header = styled.header`
    height: 70px;
    display: flex;
`;

export const Navbar = styled.nav`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const MenuContainer = styled.ul<{ verticalAlign?: 'flex-start' | 'flex-end' }>`
    display: flex;
    flex: 1;
    justify-content: ${props => props.verticalAlign || 'none'};
    list-style-type: none;
    `;

export const MenuItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: ${MARGIN}px;
    &:last-child {
        margin-right: ${MARGIN}px;
    }
`;

export const Anchor = styled.a<{ selected?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${FONT_SIZE}px;
    ${props => StrokeCss({ color: props.theme.colors.white, strokeColor: props.theme.colors.secondary, shadow: 'transparent' })}
    ${props => props.selected && StrokeCss({ color: props.theme.colors.secondary, strokeColor: props.theme.colors.white })}
    &:hover {
        ${props => StrokeCss({ color: props.theme.colors.secondary, strokeColor: props.theme.colors.white })}
    }
`;
