import dynamic from 'next/dynamic';

const AppThemeProvider = dynamic(() => import('./ThemeProvider'));
const GlobalStyled = dynamic(() => import("../styles/globalStyled"));
const AppProvider = dynamic(() => import("./App"));
const AuthProvider = dynamic(() => import("./Auth"));

import type { ReactNode } from "react";
import type { Locale } from "../locale/index.type";

export type InitialStateType = {
    isAuthenticated: boolean;
    locale: Locale;
};

interface IProviders {
    children: ReactNode;
    initialState: InitialStateType;
}

const Providers: React.FC<IProviders> = props => {
    return (
        <AppProvider {...props}>
            <AppThemeProvider>
                <GlobalStyled />
                <AuthProvider {...props}>
                    {props.children}
                </AuthProvider>
            </AppThemeProvider>
        </AppProvider>
    );
}

export default Providers;