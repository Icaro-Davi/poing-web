import dynamic from 'next/dynamic';
import { FC, ReactNode, memo } from "react";

import useModal from "../../../hooks/useModal";
import { Container, Main } from "./styles";
import LoadScreen from '../../Loading/LoadScreen';

const MainContent = dynamic(
    async () => import('./MainContent'),
    { loading: LoadScreen }
);
const LayoutDashboardSideMenuModal = dynamic(() => import("../../Modal/LayoutDashboardSideMenu"));
const Navbar = dynamic(async () => import('./Navbar'));

interface IDashboardGuildLayout {
    children: ReactNode;
}

const DashboardGuildLayout: FC<IDashboardGuildLayout> = props => {
    const [SideMenuModal, sideMenuModal] = useModal(LayoutDashboardSideMenuModal);
    return (
        <Container>
            <Navbar SideMenuModal={SideMenuModal} />
            <Main>
                <MainContent sideMenuModal={sideMenuModal}>
                    {props.children}
                </MainContent>
            </Main>
        </Container>
    );
}

export default memo(DashboardGuildLayout);