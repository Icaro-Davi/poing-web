import Router from 'next/router';
import { useRef, useState, FC, createContext, useContext, useEffect } from 'react';
import Notification from '../../components/Notification';
import AuthService from '../../services/discord/auth';
import { getLocaleLang } from '../../utils/cookies';
import DiscordUserService from '../../services/discord/user';
import BaseError from '../../utils/error/baseError';

import type { IAuthContext, IAuthProvider } from './auth.interfaces';
import type { UserType } from '../../services/discord/user/user.types';
import LocalStorage from '../../utils/localStorage';

const AuthProvider: FC<IAuthProvider> = props => {
    const { current: discordAuthUrl } = useRef(process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI);
    const [isAuthenticated, setAuth] = useState(!!props.initialState?.isAuthenticated);
    const [user, setUser] = useState<UserType>();

    const logIn = () => { };
    const logOut = async () => {
        try {
            const localeLang = getLocaleLang();
            await AuthService.logout();
            LocalStorage.clean();
            setAuth(false);
            Router.push(`/${localeLang}`);
        } catch (error) {
            new BaseError({
                origin: 'context.Auth.AuthProvider.logOut',
                message: "Error on try logout",
                error,
                callback({ notifications }) {
                    Notification.open({
                        type: 'error',
                        ...notifications.error.account.logout,
                    });
                }
            })
        }
    };

    useEffect(() => {
        AuthService.status()
            .then(setAuth)
            .catch(err => err);
    });

    useEffect(() => {
        isAuthenticated && DiscordUserService.getMe()
            .then(setUser)
            .catch(error => {
                new BaseError({
                    origin: 'context.Auth.AuthProvider.useEffect.getMe',
                    message: 'Failed fetch DiscordUser from API',
                    error,
                    callback({ notifications }) {
                        Notification.open({
                            type: 'error',
                            ...notifications.error.account.getMe
                        })
                    }
                })
            });
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            discordAuthUrl,
            user,
            logIn,
            logOut
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

const AuthContext = createContext<Partial<IAuthContext>>({});
export const useAuth = () => useContext(AuthContext);
export default AuthProvider;