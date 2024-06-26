import LocalStorageGuild from './guild';
import LocalStorageBot from './bot';
import LocalStorageFormData from './localFormData';
import LocalStorageLocale from './locale';

export const getNextFetchTimestamp = () => new Date().getTime() + ((1000 * 60) * 5);
const clean = () => localStorage.clear();

const LocalStorage = {
    clean,
    guild: {
        get: LocalStorageGuild.getGuilds,
        set: LocalStorageGuild.setGuilds,
        getChannels: LocalStorageGuild.getChannels,
        setChannels: LocalStorageGuild.setChannels,
        getSelectedId: LocalStorageGuild.getSelectedGuild,
        setSelectedId: LocalStorageGuild.setSelectedGuild,
        setModule: LocalStorageGuild.setModule
    },
    bot: {
        setSettings: LocalStorageBot.setGuildSettings,
        getSettings: LocalStorageBot.getBotSettings
    },
    localFormData: {
        get: LocalStorageFormData.get,
        set: LocalStorageFormData.set
    },
    locale: {
        save: LocalStorageLocale.saveLocale,
        get: LocalStorageLocale.getLocaleByLang,
        getAll: LocalStorageLocale.getAllLocales
    }
}

export default LocalStorage;