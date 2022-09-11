import Router from 'next/router';
import { useRef, useState, FC, createContext, useContext, useEffect } from 'react';
import Notification from '../../components/Notification';
import AuthService from '../../services/discord/auth';
import { removeAuthToken } from '../../utils/cookies';

import type { IAuthContext, IAuthProvider } from './auth.interfaces';
import type { UserType } from '../../services/discord/user/user.types';
import DiscordUserService from '../../services/discord/user';

const AuthProvider: FC<IAuthProvider> = props => {
    const { current: discordAuthUrl } = useRef(process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI);
    const [isAuthenticated, setAuth] = useState(props.initialState.isAuthenticated);
    const [user, setUser] = useState<UserType>()

    const logIn = () => { };
    const logOut = async () => {
        try {
            await AuthService.logout();
            removeAuthToken();
            setAuth(false);
            Router.push('/');
        } catch (error) {
            console.log(error);
            Notification.open({
                title: 'Error',
                description: 'Não foi possível deslogar.',
            });
        }
    };

    useEffect(() => {
        isAuthenticated && DiscordUserService.getMe()
            .then(setUser)
            .catch(error => {
                Notification.open({ title: 'Error', description: 'Error ao tentar encontrar usuário', type: 'error' })
                console.log(error);
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