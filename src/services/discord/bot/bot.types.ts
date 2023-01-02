import type { GetReference } from "../../../utils/general.types";
import type { MemberLeaveModuleType, WelcomeModuleType } from "../modules/modules.types";

type ModuleType<T> = {
    isActive?: boolean;
    settings?: T;
}

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
    modules?: {
        welcomeMember?: ModuleType<WelcomeModuleType | string>;
        memberLeave?: ModuleType<MemberLeaveModuleType | string>;
    };
    createdAt: string;
    updatedAt: string;
}

export type ModulesType = Required<GetReference<Required<GuildSettingsType>, 'modules'>>;
export type GetModuleType<K extends keyof ModulesType> = ModulesType[K];
export type GetModuleSettings<K extends keyof ModulesType> = Exclude<Required<GetModuleType<K>>['settings'], string>;