import React, { ReactNode } from "react";
import Header from "./Header";
import { Container, Main } from "./styled";

interface MainLayout {
    children: ReactNode;
}
// watch to responsive https://www.youtube.com/watch?v=53i9EHsJGxw&t=142s&ab_channel=AldarSatori
const MainLayout: React.FC<MainLayout> = props => {
    return (
        <Container>
            <Header />
            <Main>
                {props.children}
            </Main>
        </Container>
    );
}

export default React.memo(MainLayout);