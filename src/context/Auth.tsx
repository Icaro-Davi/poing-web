import Router, { useRouter } from 'next/router';
import React, { ReactNode, useState } from 'react';
import AuthLayout from '../components/layout/Auth';
import MainLayout from '../components/layout/Main';
import appRoutes from '../config/routes.json';

interface IAuthProvider {
    children: ReactNode;
    initialState: {
        isAuthenticated: boolean;
    };
}

const handleRoutesLayout = (path: string, isAuthenticated: boolean, children: ReactNode) => {
    const route = appRoutes.find(route => route.path === path);
    if (route && !route.public && !isAuthenticated) {
        typeof window !== 'undefined' && Router.push('/');
        return;
    };

    switch (route?.layout) {
        case 'MainLayout':
            return <MainLayout children={children} />;
        case 'AuthLayout':
            return <AuthLayout children={children} />;
        // 404
        default:
            return <MainLayout children={children} />;
    }
}

const AuthProvider: React.FC<IAuthProvider> = props => {
    const [isAuthenticated, setAuth] = useState(props.initialState.isAuthenticated);
    const routes = useRouter();

    const logIn = () => setAuth(true);
    const logOut = () => setAuth(false);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            logIn,
            logOut
        }}>
            {handleRoutesLayout(routes.asPath, isAuthenticated, props.children)}
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