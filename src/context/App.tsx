import React, { ReactNode } from "react";
import useMatchMedia, { BreakpointsMatch } from "../hooks/useMatchMedia";
import { Locale } from "../locale/index.type";

interface IAppProvider {
    initialState: {
        locale: Locale;
    };
    children: ReactNode;
}

const AppProvider: React.FC<IAppProvider> = props => {
    const [locale, setLocale] = React.useState<Locale>(props.initialState.locale);
    const breakpoints = useMatchMedia();

    return (
        <AppContext.Provider value={{
            locale: { ...locale, set: setLocale },
            layout: { breakpoints }
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

interface IAppContext {
    locale: Locale & { set: (locale: Locale) => void };
    layout: {
        breakpoints: BreakpointsMatch;
    }
}

const AppContext = React.createContext<IAppContext>({} as IAppContext);
export const useApp = () => React.useContext(AppContext);
export default AppProvider;