import DiscordRequestor from "../requestor";
import type { GetReference } from "../../../utils/general.types";
import type { GuildSettingsType } from "./bot.types";

class DiscordBotService {
    static basePath = '/bot';
    static async getGuildSettingsById(guildId: string) {
        try {
            const { data } = await DiscordRequestor.get<GuildSettingsType>(`${this.basePath}/guild/${guildId}`);
            return data;
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