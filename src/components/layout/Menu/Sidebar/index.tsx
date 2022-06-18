import { useRouter } from "next/router";
import { Fragment, useEffect, useRef } from "react";
import { RiMenuUnfoldLine, RiMenuFoldLine } from 'react-icons/ri';
import { useTheme } from "styled-components";
import { useApp } from "../../../../context/App";
import Logo from "../../../Logo";
import StyledLink from "../Link";
import { Anchor, Header } from "../styled";
import {
    StyledItemContainer, StyledMenuContainer,
    StyledMenuItem, StyledNav,
    StyledOpenMenuBtn, StyledSideMenuCloseBtnContainer,
    StyledSideMenuContainer, StyledSpanContent
} from "./styled";

const ICON_SIZE = 25;

const Sidebar: React.FC = props => {
    const sideMenuRef = useRef<HTMLDivElement>(null);
    const spanBoxRef = useRef<HTMLDivElement>(null);
    const appTheme = useTheme();
    const { locale } = useApp();
    const Router = useRouter();

    useEffect(() => {
        closeSideMenu();
    }, [Router.asPath]);

    const openSideMenu = () => {
        sideMenuRef.current?.classList.add('side-menu');
        spanBoxRef.current && (spanBoxRef.current.style.display = 'block');
    }
    const closeSideMenu = () => {
        sideMenuRef.current?.classList.remove('side-menu');
        spanBoxRef.current && (spanBoxRef.current.style.display = 'none');
    }
    return (
        <Fragment>
            <Header>
                <StyledNav>
                    <StyledItemContainer>
                        <StyledOpenMenuBtn onClick={openSideMenu}>
                            <RiMenuUnfoldLine size={ICON_SIZE} color={appTheme.colors.black} />
                        </StyledOpenMenuBtn>
                    </StyledItemContainer>
                    <Logo />
                    <StyledItemContainer />
                </StyledNav>
            </Header>
            <StyledSpanContent onClick={closeSideMenu} ref={spanBoxRef} />
            <StyledSideMenuContainer ref={sideMenuRef}>
                <StyledSideMenuCloseBtnContainer>
                    <StyledOpenMenuBtn onClick={closeSideMenu}>
                        <RiMenuFoldLine size={ICON_SIZE} color={appTheme.colors.black} />
                    </StyledOpenMenuBtn>
                </StyledSideMenuCloseBtnContainer>
                <StyledMenuContainer>
                    <StyledMenuItem>
                        <StyledLink selected={Router.asPath === '/'} href='/' label={locale.navbar.mainMenu.home} />
                    </StyledMenuItem>
                    <StyledMenuItem>
                        <StyledLink selected={Router.asPath === '/help'} href='/help' label={locale.navbar.mainMenu.help} />
                    </StyledMenuItem>
                    <StyledMenuItem>
                        <StyledLink selected={Router.asPath === '/commands'} href='/commands' label={locale.navbar.mainMenu.commands} />
                    </StyledMenuItem>
                    <StyledMenuItem>
                        <Anchor href='#'>{locale.navbar.mainMenu.login}</Anchor>
                    </StyledMenuItem>
                </StyledMenuContainer>
            </StyledSideMenuContainer>
        </Fragment>
    );
}

export default Sidebar;