import LocalStorage from "../../../utils/localStorage";
import DiscordRequestor from "../requestor";

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
}