import Module from "module";
import LocalStorage from "../../../utils/localStorage";
import { GetModuleSettings, GetModuleType, ModulesType } from "../bot/bot.types";
import DiscordRequestor from "../requestor";

class DefaultModuleService {
    static basePath: string;
    static moduleType: keyof ModulesType;

    static async updateActivity(isActive: boolean) {
        try {
            const guildId = LocalStorage.guild.getSelectedId();
            await DiscordRequestor.patch(`${this.basePath}/${guildId}`, null, {
                params: { active: isActive }
            });
            LocalStorage.guild.setModule(this.moduleType, { isActive });
        } catch (error) {
            throw error;
        }
    }

    static async getModuleSettings<K extends keyof ModulesType>() {
        try {
            const guildId = LocalStorage.guild.getSelectedId();
            const { data } = await DiscordRequestor.get<ModulesType[K]>(`${this.basePath}/${guildId}`);
            return data
        } catch (error) {
            throw error;
        }
    }

    static async create<K extends keyof ModulesType>(settings: GetModuleSettings<K>) {
        try {
            const guildId = LocalStorage.guild.getSelectedId();
            delete settings?.__v;
            await DiscordRequestor.post(`${this.basePath}/${guildId}`, settings);
            LocalStorage.guild.setModule(this.moduleType, { settings: settings });
        } catch (error) {
            throw error;
        }
    }

    static async updateSettings<K extends keyof ModulesType>(settings: GetModuleSettings<K>) {
        try {
            const guildId = LocalStorage.guild.getSelectedId();
            delete settings?.__v;
            await DiscordRequestor.put(`${this.basePath}/${guildId}`, settings);
            LocalStorage.guild.setModule(this.moduleType, { settings: settings });
        } catch (error) {
            throw error;
        }
    }

    static async testWelcomeMemberMessage<K extends keyof ModulesType>(settings: GetModuleSettings<K>) {
        try {
            const guildId = LocalStorage.guild.getSelectedId();
            delete settings?.__v;
            await DiscordRequestor.post(`${this.basePath}/${guildId}/test-message`, settings);
        } catch (error) {
            throw error;
        }
    }
}

export class WelcomeMemberService extends DefaultModuleService {
    static basePath: string = '/module/welcome-member';
    static moduleType: "welcomeMember" | "memberLeave" = 'welcomeMember';
}

export class MemberLeaveService extends DefaultModuleService {
    static basePath: string = '/module/member-leave';
    static moduleType: "welcomeMember" | "memberLeave" = 'memberLeave';
}