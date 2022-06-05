import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { Locale } from "../locale/index.type";
import defaultTheme from "../styles/themes/default";
import AppProvider from "./App";
import AuthProvider from "./Auth";

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
            <ThemeProvider theme={defaultTheme}>
                <AuthProvider {...props}>
                    {props.children}
                </AuthProvider>
            </ThemeProvider>
        </AppProvider>
    );
}

export default Providers;