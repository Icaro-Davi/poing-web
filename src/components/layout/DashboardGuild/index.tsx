import { FC, ReactNode, memo } from "react";
import { useEffect } from "react";
import { IoMenuSharp } from 'react-icons/io5';

import { useApp } from "../../../context/App";
import AppDispatch from "../../../context/App/dispatch";
import useModal from "../../../hooks/useModal";
import { IconButton, ICON_BUTTON_DEFAULT_HEIGHT } from "../../Buttons";
import InviteBotBtn from "../../Buttons/InviteBot";
import EmptyData from "../../EmptyData";
import LayoutDashboardSideMenuModal from "../../Modal/LayoutDashboardSideMenu";
import SideMenu from "./SideMenu";
import { Container, Main } from "./styles";

interface IDashboardGuildLayout {
    children: ReactNode;
}

const DashboardGuildLayout: FC<IDashboardGuildLayout> = props => {
    const { dispatchStore, store, layout } = useApp();
    const [SideMenuModal, sideMenuModal] = useModal(LayoutDashboardSideMenuModal);
    useEffect(() => { dispatchStore && AppDispatch.findGuildAndSave(dispatchStore) }, [dispatchStore]);
    return (
        <Container>
            {layout.isDesktopSize ? <SideMenu /> : <SideMenuModal />}
            <Main>
                {store.guilds.length
                    ? (
                        <>
                            {!layout.isDesktopSize && (
                                <>
                                    <IconButton onClick={sideMenuModal.open} hoverColor='#FFFFFF' style={{ marginBottom: '.5em', position: 'absolute' }}>
                                        <IoMenuSharp color='#000000' size={20} />
                                    </IconButton>
                                    <div style={{ width: '100%', height: `calc(${ICON_BUTTON_DEFAULT_HEIGHT} + .5em)` }} />
                                </>
                            )}
                            {props.children}
                        </>
                    )
                    : (
                        <EmptyData>
                            <InviteBotBtn />
                        </EmptyData>
                    )}
            </Main>

        </Container>
    );
}

export default memo(DashboardGuildLayout);