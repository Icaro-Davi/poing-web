import dynamic from "next/dynamic";
import React, { ReactNode } from "react";
import { useApp } from "../../../context/App";
import Footer from "../Footer";
import { Container, Main } from "./styled";
const Sidebar = dynamic(() => import("./Menu/Sidebar"));
const HorizontalMenu = dynamic(() => import("./Menu/Horizontal"));

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