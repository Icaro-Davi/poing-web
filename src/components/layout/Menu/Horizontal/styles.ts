import styled from "styled-components";
import { MARGIN } from "../styled";

export const Navbar = styled.nav`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

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
