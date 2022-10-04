import { useEffect } from "react";
import { useReducer, FC, useState, createContext, useContext } from "react";
import useMatchMedia from "../../hooks/useMatchMedia";
import appReducer from "./reducer";

import type { IAppContext, IAppProvider } from "./app.interfaces";
import type { Locale } from "../../locale/index.type";

const AppProvider: FC<IAppProvider> = props => {
    const [locale, setLocale] = useState<Locale>(props.initialState?.locale);
    const [pageLoaded, setPageLoading] = useState(false);
    const breakpoints = useMatchMedia();
    const [store, dispatchStore] = useReducer(appReducer, {
        guilds: [],
        selectedGuildId: ''
    });

    const handleLoad = async () => {
        // const { isMobile } = (await import('react-device-detect'));
        const { getLocale } = (await import('../../locale'));

        const loadDataAndStartApp = async () => {
            if (!locale) {
                const _locale = (await getLocale()) as Locale;
                setLocale(_locale);
            }
            setPageLoading(true);
        }

        await loadDataAndStartApp();
    }

    useEffect(() => { handleLoad() }, []);
    return (
        <AppContext.Provider value={{
            store,
            dispatchStore,
            locale: { ...locale, set: setLocale },
            layout: {
                breakpoints,
                isDesktopSize: breakpoints.md && breakpoints.sm
            },
        }}>
            {pageLoaded ? props.children : ''}
        </AppContext.Provider>
    )
}

const AppContext = createContext<IAppContext>({} as IAppContext);
export const useApp = () => useContext(AppContext);
export default AppProvider;