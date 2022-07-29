import { useRef, useState, FC, createContext, useContext } from 'react';
import { IAuthContext, IAuthProvider } from './auth.interfaces';

const AuthProvider: FC<IAuthProvider> = props => {
    const { current: discordAuthUrl } = useRef(process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI);
    const [isAuthenticated, setAuth] = useState(props.initialState.isAuthenticated);

    const logIn = () => { };
    const logOut = () => setAuth(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, discordAuthUrl, logIn, logOut }}>
            {props.children}
        </AuthContext.Provider>
    );
}

const AuthContext = createContext<Partial<IAuthContext>>({});
export const useAuth = () => useContext(AuthContext);
export default AuthProvider;