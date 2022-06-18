import React, { ReactNode } from "react";
import { useApp } from "../../../context/App";
import HorizontalMenu from "../Menu/Horizontal";
import Sidebar from "../Menu/Sidebar";
import { Container, Main } from "./styled";

interface MainLayout {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayout> = props => {
    const { layout } = useApp();
    const isMobile = layout.breakpoints.md && layout.breakpoints.sm;
    return (
        <Container>
            {isMobile
                ? <HorizontalMenu />
                : <Sidebar />}
            <Main>
                {props.children}
            </Main>
        </Container>
    );
}

export default React.memo(MainLayout);