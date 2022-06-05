import React, { ReactNode, useState } from 'react';
import AuthLayout from '../components/layout/Auth';
import MainLayout from '../components/layout/Main';

interface IAuthProvider {
    children: ReactNode;
    initialState: {
        isAuthenticated: boolean;
    };
}

const AuthProvider: React.FC<IAuthProvider> = props => {
    const [isAuthenticated, setAuth] = useState(props.initialState.isAuthenticated);

    const logIn = () => setAuth(true);
    const logOut = () => setAuth(false);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            logIn,
            logOut
        }}>
            {
                isAuthenticated
                    ? (<AuthLayout>{props.children}</AuthLayout>)
                    : (<MainLayout>{props.children}</MainLayout>)
            }
        </AuthContext.Provider>
    );
}

interface IAuthContext {
    isAuthenticated: boolean;
    logIn: () => void;
    logOut: () => void;
}

const AuthContext = React.createContext<Partial<IAuthContext>>({});
export const useAuth = () => React.useContext(AuthContext);
export default AuthProvider;