import { createContext, FC, useCallback, useContext, useEffect, useReducer, useState } from "react";
import useMatchMedia from "../../hooks/useMatchMedia";
import appReducer from "./reducer";

import type { Locale } from "../../locale/index.type";
import LocaleType from "../../locale/types";
import DiscordBotService from "../../services/discord/bot";
import { useAuth } from "../Auth";
import type { IAppContext, IAppProvider } from "./app.interfaces";
import AppDispatch from "./dispatch";

const AppProvider: FC<IAppProvider> = props => {
    const [locale, setLocale] = useState<Locale>(props.initialState?.locale);
    const [loadApp, setLoadApp] = useState({ isLoading: false, isReady: false });
    const breakpoints = useMatchMedia();
    const { isAuthenticated } = useAuth();
    const [store, dispatchStore] = useReducer(appReducer, {
        guilds: [],
        selectedGuildId: ''
    });

    const loadGuilds = useCallback(async (isAuthenticated: boolean) => {
        try {
            isAuthenticated && await AppDispatch.findGuildAndSave(dispatchStore)
                .then(async (store) => {
                    store?.selectedGuildId && DiscordBotService.getGuildSettingsById(store.selectedGuildId);
                })
        } catch (error) {
            console.error('[APP_CONTEXT] Failed to load guilds');
        }
    }, []);

    const handleLoad = useCallback(async (params: {
        app: { isLoading: boolean; isReady: boolean; }
        isAuthenticated: boolean;
        locale?: LocaleType;
    }) => {
        if (params.app.isLoading) return;
        !params.app.isReady && setLoadApp({ isLoading: true, isReady: false });
        const { getLocale } = (await import('../../locale'));
        const loadDataAndStartApp = async () => {
            if (!params.locale) {
                const _locale = (await getLocale()) as Locale;
                setLocale(_locale);
            }
            await loadGuilds(!!params.isAuthenticated);
        }
        await loadDataAndStartApp();
        setLoadApp({ isLoading: false, isReady: true });
    }, [loadGuilds]);


    useEffect(() => {
        if (!loadApp.isLoading && ((!store.guilds.length && isAuthenticated) || !loadApp.isReady))
            handleLoad({ app: loadApp, isAuthenticated: !!isAuthenticated, locale });
    }, [handleLoad, loadApp, isAuthenticated, locale, store.guilds.length]);

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
            {loadApp.isReady && props.children}
        </AppContext.Provider>
    )
}

const AppContext = createContext<IAppContext>({} as IAppContext);
export const useApp = () => useContext(AppContext);
export default AppProvider;