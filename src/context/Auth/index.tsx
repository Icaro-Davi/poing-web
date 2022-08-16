import Router from 'next/router';
import { useRef, useState, FC, createContext, useContext } from 'react';
import Notification from '../../components/Notification';
import AuthService from '../../services/discord/auth';
import { removeAuthToken } from '../../utils/cookies';
import { IAuthContext, IAuthProvider } from './auth.interfaces';

const AuthProvider: FC<IAuthProvider> = props => {
    const { current: discordAuthUrl } = useRef(process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI);
    const [isAuthenticated, setAuth] = useState(props.initialState.isAuthenticated);

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

    return (
        <AuthContext.Provider value={{ isAuthenticated, discordAuthUrl, logIn, logOut }}>
            {props.children}
        </AuthContext.Provider>
    );
}

const AuthContext = createContext<Partial<IAuthContext>>({});
export const useAuth = () => useContext(AuthContext);
export default AuthProvider;