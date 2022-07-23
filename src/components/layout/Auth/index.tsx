import { FC, ReactNode, memo } from "react";
import { useEffect } from "react";

import { useApp } from "../../../context/App";
import DiscordUserService from "../../../services/discord/user";
import SideMenu from "./SideMenu";
import { Container, Main } from "./styles";

interface IAuthLayout {
    children: ReactNode;
}

const AuthLayout: FC<IAuthLayout> = props => {
    const { store: { guilds }, dispatchStore } = useApp();
    useEffect(() => {
        let cancelRequest = false;
        !guilds.length && DiscordUserService.getGuilds()
            .then(guilds => {
                if (!cancelRequest) dispatchStore({ type: 'SET_GUILDS', payload: { guilds } });
            });
        return () => { cancelRequest = true };
    }, []);
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