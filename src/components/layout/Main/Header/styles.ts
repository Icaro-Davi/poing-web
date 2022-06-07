import styled, { css } from "styled-components";

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

const SelectedAnchor = css`
    color: ${props => props.theme.colors.secondary};
    text-shadow:
    -1px -1px 0 ${props => props.theme.colors.white},
    1px -1px 0 ${props => props.theme.colors.white},
    -1px 1px 0 ${props => props.theme.colors.white},
    1px 1px 0 ${props => props.theme.colors.white},
    0 2px 5px ${props => props.theme.colors.black};
`;

export const Anchor = styled.a<{ selected?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.white};
    font-size: ${FONT_SIZE}px;
    text-shadow:
    -1px -1px 0 ${props => props.theme.colors.secondary},
    1px -1px 0 ${props => props.theme.colors.secondary},
    -1px 1px 0 ${props => props.theme.colors.secondary},
    1px 1px 0 ${props => props.theme.colors.secondary};

    ${props => props.selected ? SelectedAnchor : css`&:hover { ${SelectedAnchor} }`}
`;

