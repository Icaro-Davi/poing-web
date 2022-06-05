import React, { ReactNode } from "react";
import { Locale } from "../locale/index.type";

interface IAppProvider {
    initialState: {
        locale: Locale;
    };
    children: ReactNode;
}

const AppProvider: React.FC<IAppProvider> = props => {
    const [locale, setLocale] = React.useState<Locale>(props.initialState.locale);
    return (
        <AppContext.Provider value={{
            locale: { ...locale, set: setLocale }
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

interface IAppContext {
    locale: Locale & { set: (locale: Locale) => void };
}

const AppContext = React.createContext<Partial<IAppContext>>({});
export const useApp = () => React.useContext(AppContext);
export default AppProvider;