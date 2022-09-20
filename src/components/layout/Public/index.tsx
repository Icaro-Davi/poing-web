import dynamic from "next/dynamic";
import React, { ReactNode } from "react";
import { useApp } from "../../../context/App";
import LoadWrapper from "../../Loading/LoadWrapper";
import Footer from "../Footer";
import { Container, Main } from "./styled";
const Sidebar = dynamic(() => import("./Menu/Sidebar"), { loading: () => <LoadWrapper isLoading={true}><div style={{ width: '100%', height: 100 }} /></LoadWrapper> });
const HorizontalMenu = dynamic(() => import("./Menu/Horizontal"), { loading: () => <LoadWrapper isLoading={true}><div style={{ width: '100%', height: 100 }} /></LoadWrapper> });

interface MainLayout {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayout> = props => {
    const { layout, locale: { layouts: {  public: { footer } } } } = useApp();
    return (
        <Container>
            {layout.isDesktopSize
                ? <HorizontalMenu />
                : <Sidebar />}
            <Main>
                {props.children}
                <Footer createdWith={footer.createdWith} createdBy={footer.createdBy} />
            </Main>
        </Container>
    );
}

export default React.memo(MainLayout);