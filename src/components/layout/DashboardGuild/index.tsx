import { FC, ReactNode, memo } from "react";
import { useEffect } from "react";

import { useApp } from "../../../context/App";
import AppDispatch from "../../../context/App/dispatch";
import InviteBotBtn from "../../Buttons/InviteBot";
import EmptyData from "../../EmptyData";
import SideMenu from "./SideMenu";
import { Container, Main } from "./styles";

interface IDashboardGuildLayout {
    children: ReactNode;
}

const DashboardGuildLayout: FC<IDashboardGuildLayout> = props => {
    const { dispatchStore, store } = useApp();
    useEffect(() => { dispatchStore && AppDispatch.findGuildAndSave(dispatchStore) }, [dispatchStore]);
    return (
        <Container>
            <SideMenu />
            <Main>
                {store.guilds.length
                    ? props.children
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