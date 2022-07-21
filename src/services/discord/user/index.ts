import DiscordRequestor from "../requestor";
import { UserGuildType } from "./user.types";

class DiscordUserService {
    private static basePath = '/user';

    static async getGuilds() {
        try {
            const { data } = await DiscordRequestor.get<UserGuildType[]>(`${this.basePath}/guilds`);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

}

export default DiscordUserService;