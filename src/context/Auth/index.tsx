import { useRouter } from 'next/router';
import { useRef, useState, FC, createContext, useContext } from 'react';
import { useApp } from '../App';
import { IAuthContext, IAuthProvider } from './auth.interfaces';
import handleLayoutByRoots from './handleLayoutByRoots';

const AuthProvider: FC<IAuthProvider> = props => {
    const { current: discordAuthUrl } = useRef(process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI);
    const [isAuthenticated, setAuth] = useState(props.initialState.isAuthenticated);
    const { layout } = useApp();
    const routes = useRouter();

    const logIn = () => { };
    const logOut = () => setAuth(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, discordAuthUrl, logIn, logOut }}>
            {layout.pageLoaded ? handleLayoutByRoots(routes.pathname, isAuthenticated, props.children, routes.push) : ''}
        </AuthContext.Provider>
    );
}

const AuthContext = createContext<Partial<IAuthContext>>({});
export const useAuth = () => useContext(AuthContext);
export default AuthProvider;