import { getNextFetchTimestamp } from ".";
import { ModulesType } from "../../services/discord/bot/bot.types";
import { UserGuildType } from "../../services/discord/user/user.types";
import LocalStorageKeys from "./keys";
import { LocalStorageFuncOptions } from "./local.types";
import LocalStorageBot from './bot';
import { GuildChannel } from "../../services/discord/guild/guild.type";

function getGuilds(): UserGuildType[];
function getGuilds(id?: string): UserGuildType;
function getGuilds(id?: string): any {
    if (typeof localStorage !== 'undefined') {
        let stringifyGuild = localStorage.getItem(LocalStorageKeys.GUILDS);
        if (!stringifyGuild) return;
        const guilds = JSON.parse(localStorage.getItem(LocalStorageKeys.GUILDS) ?? "") as UserGuildType[] | undefined;
        if (guilds && id) return guilds.find(guild => guild.id === id);
        return guilds;
    }
}

const setGuilds = (guilds: UserGuildType[]) => localStorage.setItem(LocalStorageKeys.GUILDS, JSON.stringify(guilds));
const setSelectedGuild = (guildId: string) => localStorage.setItem(LocalStorageKeys.SELECTED_GUILD_ID, guildId);
const getSelectedGuild = () => localStorage.getItem(LocalStorageKeys.SELECTED_GUILD_ID) ?? LocalStorageBot.getBotSettings()?._id;

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

function setModule<K extends keyof ModulesType>(moduleType: K, moduleSettings: ModulesType[K]) {
    const botSettings = LocalStorageBot.getBotSettings();
    if (botSettings)
        LocalStorageBot.setGuildSettings({
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

export default {
    getGuilds,
    setGuilds,
    setSelectedGuild,
    getSelectedGuild,
    getChannels,
    setChannels,
    setModule
}