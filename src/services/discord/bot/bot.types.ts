import type { WelcomeModuleType } from "../modules/modules.types";

export type GuildSettingsType = {
    _id: string;
    bot: {
        prefix: string,
        locale: 'pt-BR' | 'en-US';
        messageEmbedHexColor: string;
        roles: {
            muteId: string;
        };
    };
    modules: {
        welcomeMember: {
            isActive: boolean;
            settings: WelcomeModuleType | string;
        }
    };
    createdAt: string;
    updatedAt: string;
}