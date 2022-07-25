import { FC, ReactNode, memo } from "react";
import { useEffect } from "react";

import { useApp } from "../../../context/App";
import AppDispatch from "../../../context/App/dispatch";
import SideMenu from "./SideMenu";
import { Container, Main } from "./styles";

interface IAuthLayout {
    children: ReactNode;
}

const AuthLayout: FC<IAuthLayout> = props => {
    const { dispatchStore } = useApp();
    useEffect(() => { AppDispatch.findGuildAndSave(dispatchStore) }, []);
    return (
        <Container>
            <SideMenu />
            <Main>
                {props.children}
            </Main>
        </Container>
    );
}

export default memo(AuthLayout);