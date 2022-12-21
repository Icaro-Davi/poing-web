import dynamic from "next/dynamic";
import { ReactNode, FC, memo } from "react";
import { Container, Main } from "./styled";

const Navbar = dynamic(async () => import('./Menu'));
const Footer = dynamic(async () => import('../Footer'));

interface MainLayout {
    children: ReactNode;
}

const MainLayout: FC<MainLayout> = props => {
    return (
        <Container>
            <Navbar />
            <Main>
                {props.children}
                <Footer />
            </Main>
        </Container>
    );
}

export default memo(MainLayout);