import DiscordRequestor from "../requestor";
import type { GetReference } from "../../../utils/general.types";
import type { GuildSettingsType } from "./bot.types";
import LocalStorage from "../../../utils/localStorage";

class DiscordBotService {
    static basePath = '/bot';
    static async getGuildSettingsById(guildId: string) {
        try {
            const botSettings = LocalStorage.bot.getSettings();
            if ((botSettings && (!botSettings?.nextFetch || botSettings.nextFetch < Date.now())) || !botSettings || guildId !== botSettings._id) {
                const { data } = await DiscordRequestor.get<GuildSettingsType>(`${this.basePath}/guild/${guildId}`);
                LocalStorage.bot.setSettings(data, { updateFetchDate: true });
                return data;
            } else {
                return botSettings;
            }
        } catch (error) {
            throw error;
        }
    }

    static async updateGuildSettingsById(guildId: string, settings: Omit<GetReference<GuildSettingsType, 'bot'>, 'roles'>) {
        try {
            await DiscordRequestor.post(`${this.basePath}/guild/${guildId}`, settings);
        } catch (error) {
            throw error;
        }
    }
}

export default DiscordBotService;