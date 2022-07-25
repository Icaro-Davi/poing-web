import { useEffect } from "react";
import { useReducer, FC, useState, createContext, useContext } from "react";
import { isMobile } from 'react-device-detect'
import useMatchMedia from "../../hooks/useMatchMedia";
import { Locale } from "../../locale/index.type";
import { IAppContext, IAppProvider } from "./app.interfaces";
import appReducer from "./reducer";

const AppProvider: FC<IAppProvider> = props => {
    const [locale, setLocale] = useState<Locale>(props.initialState.locale);
    const [pageLoaded, setPageLoading] = useState(false);
    const breakpoints = useMatchMedia();
    const [store, dispatchStore] = useReducer(appReducer, {
        guilds: [],
        selectedGuildId: ''
    });

    useEffect(() => {
        isMobile ? setPageLoading(true) : window.addEventListener('load', () => {
            setPageLoading(true);
        });
    }, []);

    return (
        <AppContext.Provider value={{
            store,
            dispatchStore,
            locale: { ...locale, set: setLocale },
            layout: { breakpoints, pageLoaded },
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

const AppContext = createContext<IAppContext>({} as IAppContext);
export const useApp = () => useContext(AppContext);
export default AppProvider;