import LocalStorage from "../../../utils/localStorage";
import DiscordRequestor from "../requestor";

import type { UserGuildType, UserType } from "./user.types";

class DiscordUserService {
    private static basePath = '/user';

    static async getGuilds() {
        try {
            const { data } = await DiscordRequestor.get<UserGuildType[]>(`${this.basePath}/guilds`);
            const guilds = data.map(guild => ({
                ...guild,
                icon: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`,
                roles: guild.roles.filter(role => role.name !== '@everyone')
            }));
            LocalStorage.guild.set(guilds);
            return guilds;
        } catch (error) {
            throw error;
        }
    }

    static async getMe() {
        try {
            const { data } = await DiscordRequestor.get<UserType>(`${this.basePath}/me`);
            data.avatar = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.webp`;
            return data;
        } catch (error) {
            throw error;
        }
    }

}

export default DiscordUserService;