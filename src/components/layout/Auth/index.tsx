import React, { ReactNode } from "react";
import { useEffect } from "react";
import { useApp } from "../../../context/App";
import DiscordUserService from "../../../services/discord/user";

interface IAuthLayout {
    children: ReactNode;
}

const AuthLayout: React.FC<IAuthLayout> = props => {
    const { store: { guilds }, dispatchStore } = useApp();
    useEffect(() => {
        let cancelRequest = false;
        !guilds.length && DiscordUserService.getGuilds().then(guilds => {
            if (!cancelRequest) dispatchStore({ type: 'SET_GUILDS', payload: { guilds } });
        });
        return () => { cancelRequest = true };
    }, []);
    return (
        <React.Fragment>
            <div style={{ backgroundColor: 'red', width: '100%', height: '100%' }}>
                Authenticated
                {props.children}
            </div>
        </React.Fragment>
    );
}

export default React.memo(AuthLayout);