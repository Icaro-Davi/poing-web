import { getNextFetchTimestamp } from ".";
import { GuildSettingsType } from "../../services/discord/bot/bot.types";
import LocalStorageKeys from "./keys";
import { LocalStorageFuncOptions } from "./local.types";

const getBotSettings = () => {
    let guildSettings = localStorage.getItem(LocalStorageKeys.GUILD_SETTINGS);
    return (guildSettings ? JSON.parse(guildSettings) : undefined) as GuildSettingsType & { nextFetch: number } | undefined;
};

const setGuildSettings = (guildSettings: GuildSettingsType, options?: LocalStorageFuncOptions) => {
    const nextFetch = getNextFetchTimestamp();
    if (options?.updateFetchDate) {
        localStorage.setItem(LocalStorageKeys.GUILD_SETTINGS, JSON.stringify({ ...guildSettings, nextFetch }));
        return;
    }
    const botSettings = getBotSettings();
    localStorage.setItem(LocalStorageKeys.GUILD_SETTINGS, JSON.stringify({ ...guildSettings, nextFetch: botSettings?.nextFetch || nextFetch }));
}

const bot = {
    getBotSettings,
    setGuildSettings
}

export default bot;