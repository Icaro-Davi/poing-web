import React, { ReactNode } from "react";
import { useApp } from "../../../context/App";
import Footer from "../Footer";
import HorizontalMenu from "./Menu/Horizontal";
import Sidebar from "./Menu/Sidebar";
import { Container, Main } from "./styled";

interface MainLayout {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayout> = props => {
    const { layout } = useApp();
    return (
        <Container>
            {layout.isDesktopSize
                ? <HorizontalMenu />
                : <Sidebar />}
            <Main>
                {props.children}
                <Footer />
            </Main>
        </Container>
    );
}

export default React.memo(MainLayout);