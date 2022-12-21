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
            const botSettings = LocalStorage.bot.getSettings();
            if (botSettings)
                LocalStorage.bot.setSettings({
                    ...botSettings,
                    modules: {
                        ...botSettings?.modules,
                        welcomeMember: {
                            ...botSettings?.modules?.welcomeMember,
                            isActive
                        }
                    }
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

    static async create({ __v, _id, ...welcomeMember }: WelcomeModuleType) {
        try {
            const guildId = LocalStorage.guild.getSelectedId();
            await DiscordRequestor.post(`${this.basePath}/${guildId}`, welcomeMember);
        } catch (error) {
            throw error;
        }
    }

    static async updateSettings({ __v, _id, ...welcomeMember }: WelcomeModuleType) {
        try {
            const guildId = LocalStorage.guild.getSelectedId();
            await DiscordRequestor.put(`${this.basePath}/${guildId}`, welcomeMember);
        } catch (error) {
            throw error;
        }
    }

    static async testWelcomeMemberMessage({ __v, _id, ...welcomeMember }: WelcomeModuleType) {
        try {
            const guildId = LocalStorage.guild.getSelectedId();
            await DiscordRequestor.post(`${this.basePath}/${guildId}/test-message`, welcomeMember);
        } catch (error) {
            throw error;
        }
    }
}