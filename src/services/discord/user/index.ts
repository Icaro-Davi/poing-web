import DiscordRequestor from "../requestor";
import { UserGuildType } from "./user.types";

class DiscordUserService {
    private static basePath = '/user';

    static async getGuilds() {
        try {
            const { data } = await DiscordRequestor.get<UserGuildType[]>(`${this.basePath}/guilds`);
            return data.map(guild => ({ ...guild, icon: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}` }));
        } catch (error) {
            throw error;
        }
    }

}

export default DiscordUserService;