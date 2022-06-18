import styled from "styled-components";
import { MARGIN } from "../styled";

export const StyledNav = styled.nav`
    flex: 1;
    display: flex;
    margin: 0 ${MARGIN}px;
    align-items: center;
`;

export const StyledItemContainer = styled.div`
    flex: 1;
`;

export const StyledOpenMenuBtn = styled.button`
    border: 0;
    background-color: transparent;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

export const StyledSideMenuContainer = styled.div`
    position: fixed;
    height: 100%;
    width: clamp(8rem, 50%, 12rem);
    top: 0;
    left: -200px;
    z-index: 15;
    overflow-x: hidden;
    background-color: ${props => props.theme.colors.primary};
    transition: left 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    box-shadow: -2px -2px 7px ${props => props.theme.colors.black};
    &.side-menu {
        left: 0;
    }
`;

export const StyledSideMenuCloseBtnContainer = styled.div`
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: right;
    padding-right:${MARGIN}px;
`;

export const StyledSpanContent = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 10;
    background-color: black;
    opacity: 0.5;
    display: none;
`;

export const StyledMenuContainer = styled.ul``;

export const StyledMenuItem = styled.li`
    margin-top: 1rem;
`;