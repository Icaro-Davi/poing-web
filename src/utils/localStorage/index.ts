import { GuildSettingsType } from "../../services/discord/bot/bot.types";
import LocalStorageKeys from "./keys";

const setSelectedGuild = (guildId: string) => localStorage.setItem(LocalStorageKeys.SELECTED_GUILD_ID, guildId);
const getSelectedGuild = () => localStorage.getItem(LocalStorageKeys.SELECTED_GUILD_ID) ?? getBotSettings()?._id;

const setGuildSettings = (guildSettings: GuildSettingsType, options?: { updateFetchDate?: boolean }) => {
    const nextFetch = new Date().getTime() + ((1000 * 60) * 5);
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

const LocalStorage = {
    clean,
    guild: {
        getSelectedId: getSelectedGuild,
        setSelectedId: setSelectedGuild
    },
    bot: {
        setSettings: setGuildSettings,
        getSettings: getBotSettings
    }
}

export default LocalStorage;