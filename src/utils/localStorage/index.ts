import { GuildSettingsType } from "../../services/discord/bot/bot.types";
import LocalStorageKeys from "./keys";

const setSelectedGuild = (guildId: string) => localStorage.setItem(LocalStorageKeys.SELECTED_GUILD_ID, guildId);
const getSelectedGuild = () => localStorage.getItem(LocalStorageKeys.SELECTED_GUILD_ID);

const setGuildSettings = (guildSettings: GuildSettingsType) => localStorage.setItem(LocalStorageKeys.GUILD_SETTINGS, JSON.stringify(guildSettings));
const getBotSettings = () => {
    let guildSettings = localStorage.getItem(LocalStorageKeys.GUILD_SETTINGS);
    return (guildSettings ? JSON.parse(guildSettings) : undefined) as GuildSettingsType | undefined;
};

const LocalStorage = {
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