import dynamic from 'next/dynamic';
import GlobalStyled from "../styles/globalStyled";

const AuthProvider = dynamic(() => import("./Auth"));
const AppThemeProvider = dynamic(() => import('./ThemeProvider'));
const AppProvider = dynamic(() => import("./App"));

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