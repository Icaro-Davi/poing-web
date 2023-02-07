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
    const guild = getGuilds(getSelectedGuild());
    if (guild.channels) return guild.channels;
};

const setChannels = (channels: GuildChannel[], options?: LocalStorageFuncOptions) => {
    const nextFetch = getNextFetchTimestamp();
    const guilds = getGuilds();
    const selectedGuildId = getSelectedGuild();

    const updateLocalGuildChannels = (nextFetch: number) => {
        return guilds.map(guild => {
            if (guild.id === selectedGuildId) {
                return { ...guild, channels: { nextFetch, list: channels } };
            }
            return guild;
        });
    }

    if (options?.updateFetchDate) {
        setGuilds(updateLocalGuildChannels(nextFetch));
        return;
    }

    const localChannels = getChannels();
    const guild = getGuilds(selectedGuildId);
    setGuilds(updateLocalGuildChannels((guild && (guild.channels?.nextFetch ?? 1) < Date.now()) ? nextFetch : localChannels?.nextFetch ?? nextFetch));
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