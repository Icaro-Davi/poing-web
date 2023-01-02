import { GuildSettingsType, ModulesType } from "../../services/discord/bot/bot.types";
import { GuildChannel } from "../../services/discord/guild/guild.type";
import LocalStorageKeys from "./keys";
import { LocalStorageFuncOptions } from "./local.types";

const getNextFetchTimestamp = () => new Date().getTime() + ((1000 * 60) * 5);

const setSelectedGuild = (guildId: string) => localStorage.setItem(LocalStorageKeys.SELECTED_GUILD_ID, guildId);
const getSelectedGuild = () => localStorage.getItem(LocalStorageKeys.SELECTED_GUILD_ID) ?? getBotSettings()?._id;

const setGuildSettings = (guildSettings: GuildSettingsType, options?: LocalStorageFuncOptions) => {
    const nextFetch = getNextFetchTimestamp();
    if (options?.updateFetchDate) {
        localStorage.setItem(LocalStorageKeys.GUILD_SETTINGS, JSON.stringify({ ...guildSettings, nextFetch }));
        return;
    }
    const botSettings = getBotSettings();
    localStorage.setItem(LocalStorageKeys.GUILD_SETTINGS, JSON.stringify({ ...guildSettings, nextFetch: botSettings?.nextFetch || nextFetch }));
}
const getBotSettings = () => {
    let guildSettings = localStorage.getItem(LocalStorageKeys.GUILD_SETTINGS);
    return (guildSettings ? JSON.parse(guildSettings) : undefined) as GuildSettingsType & { nextFetch: number } | undefined;
};

const clean = () => {
    localStorage.clear();
}

const getChannels = () => {
    const localChannels = localStorage.getItem(LocalStorageKeys.CHANNELS);
    if (localChannels) return JSON.parse(localChannels) as {
        nextFetch: number;
        list: GuildChannel[];
    };
};
const setChannels = (channels: GuildChannel[], options?: LocalStorageFuncOptions) => {
    const nextFetch = getNextFetchTimestamp();
    if (options?.updateFetchDate) {
        localStorage.setItem(LocalStorageKeys.CHANNELS, JSON.stringify({ nextFetch, list: channels }));
        return;
    }
    const localChannels = getChannels();
    localStorage.setItem(LocalStorageKeys.CHANNELS, JSON.stringify({
        list: channels,
        nextFetch: localChannels && localChannels.nextFetch < Date.now() ? nextFetch : localChannels?.nextFetch ?? nextFetch
    }));
};

function setModule<K extends keyof ModulesType>(moduleType: K, moduleSettings: ModulesType[K]){
    const botSettings = getBotSettings();
    if (botSettings)
        setGuildSettings({
            ...botSettings,
            modules: {
                ...botSettings?.modules,
                [moduleType]: {
                    ...botSettings?.modules?.[moduleType],
                    ...moduleSettings
                }
            }
        });
}

const LocalStorage = {
    clean,
    guild: {
        getChannels, setChannels,
        getSelectedId: getSelectedGuild,
        setSelectedId: setSelectedGuild,
        setModule
    },
    bot: {
        setSettings: setGuildSettings,
        getSettings: getBotSettings
    }
}

export default LocalStorage;