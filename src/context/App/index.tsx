import { useEffect } from "react";
import { useReducer, FC, useState, createContext, useContext } from "react";
import useMatchMedia from "../../hooks/useMatchMedia";
import appReducer from "./reducer";

import type { IAppContext, IAppProvider } from "./app.interfaces";
import type { Locale } from "../../locale/index.type";
import DiscordBotService from "../../services/discord/bot";
import AppDispatch from "./dispatch";
import { useAuth } from "../Auth";
import LocalStorage from '../../utils/localStorage';

const AppProvider: FC<IAppProvider> = props => {
    const [locale, setLocale] = useState<Locale>(props.initialState?.locale);
    const [loadApp, setLoadApp] = useState({ isLoading: false, isReady: false });
    const breakpoints = useMatchMedia();
    const { isAuthenticated } = useAuth();
    const [store, dispatchStore] = useReducer(appReducer, {
        guilds: LocalStorage.guild.get() ?? [],
        selectedGuildId: ''
    });

    const loadGuilds = async () => {
        try {
            isAuthenticated
                ? await AppDispatch.findGuildAndSave(dispatchStore)
                    .then(async (store) => {
                        store?.selectedGuildId && DiscordBotService.getGuildSettingsById(store.selectedGuildId);
                        setLoadApp({ isLoading: false, isReady: true });
                    })
                : setLoadApp({ isLoading: false, isReady: true });
        } catch (error) {
            console.error('[APP_CONTEXT] Failed to load guilds');
        }
    }

    const handleLoad = async () => {
        if (loadApp.isLoading) return;
        !loadApp.isReady && setLoadApp({ isLoading: true, isReady: false });
        const { getLocale } = (await import('../../locale'));

        const loadDataAndStartApp = async () => {
            if (!locale) {
                const _locale = (await getLocale()) as Locale;
                setLocale(_locale);
            }
            await loadGuilds();
        }
        await loadDataAndStartApp();
    }

    useEffect(() => { handleLoad(); }, [isAuthenticated]);
    useEffect(() => {
        window.addEventListener('focus', async () => {
            if (!LocalStorage.guild.get()) {
                await loadGuilds();
            }
        });
    }, []);

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