import LocalStorage from "../../../utils/localStorage";
import DiscordRequestor from "../requestor";
import { MessageWithComponentsType } from "./modules.types";

class RoleByInteractionService {
    static basePath = '/module/role-by-interaction';

    static async create(roleByInteractionSettings: MessageWithComponentsType){
        try {
            const selectedGuildId = LocalStorage.guild.getSelectedId();
            await DiscordRequestor.post(`${this.basePath}/${selectedGuildId}`, roleByInteractionSettings);
        } catch (error) {
            throw error;
        }
    }

    static async updateActivity(isActive: boolean){
        try {
            const selectedGuildId = LocalStorage.guild.getSelectedId();
            await DiscordRequestor.patch(`${this.basePath}/${selectedGuildId}/?active=${isActive}`);
            LocalStorage.guild.setModule('roleByInteraction', { isActive });
        } catch (error) {
            throw error;
        }
    }

}

export default RoleByInteractionService;