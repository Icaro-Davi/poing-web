import React, { ReactNode } from "react";
import Header from "../../Header";
import { Container } from "./styled";

interface MainLayout {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayout> = props => {
    return (
        <Container>
            <Header />
            <main>
                {props.children}
            </main>
        </Container>
    );
}

export default MainLayout;