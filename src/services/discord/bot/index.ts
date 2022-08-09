import DiscordRequestor from "../requestor";
import { GuildSettingsType } from "./bot.types";

class DiscordBotService {
    static basePath = '/bot';
    static async getGuildSettingsById(guildId: string) {
        try {
            const { data } = await DiscordRequestor.get<GuildSettingsType>(`${this.basePath}/guild/${guildId}`);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

}

export default DiscordBotService;