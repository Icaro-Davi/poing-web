import LocalStorage from "../../../utils/localStorage";
import DiscordRequestor from "../requestor";
import { WelcomeModuleType } from "./modules.types";

export class WelcomeMemberService {
    static basePath = '/module/welcome-member';

    static async updateActivity(isActive: boolean) {
        try {
            const guildId = LocalStorage.guild.getSelectedId();
            await DiscordRequestor.patch(`${this.basePath}/${guildId}`, null, {
                params: { active: isActive }
            });
        } catch (error) {
            throw error;
        }
    }

    static async getModuleSettings() {
        try {
            const guildId = LocalStorage.guild.getSelectedId();
            const { data } = await DiscordRequestor.get<{ isActive: boolean; settings: WelcomeModuleType }>(`${this.basePath}/${guildId}`);
            return data;
        } catch (error) {
            throw error;
        }
    }
}