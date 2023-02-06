import { GetReference } from "../../../utils/general.types";
import { MemberLeaveService, WelcomeMemberService } from "./welcomeOrLeaveMember";

type APIPartialEmoji = {
    id: string | null;
    name: string | null;
    animated?: boolean;
}

export type ComponentStyleTypes = 'PRIMARY' | 'SECONDARY' | 'SUCCESS' | 'DANGER' | 'LINK';

export type ComponentButton = {
    style: string;
    roleId: string;
    type: 'BUTTON' | number;
    custom_id?: string;
    disabled?: boolean;
    emoji?: APIPartialEmoji;
    label?: string;
    url?: string;
}

export type MessageSelectOption = {
    label: string;
    value: string;
    default?: boolean;
    description?: string | null;
    emoji?: APIPartialEmoji;
}

export type ComponentStringSelect = {
    custom_id: string | null;
    disabled: boolean;
    max_values: number | null;
    min_values: number | null;
    options: MessageSelectOption[];
    placeholder: string | null;
    type: 'STRING_SELECT' | 'USER_SELECT' | number;
}

export type ComponentsType = ComponentButton | ComponentStringSelect;

export type MessageComponentLabelTypes = GetReference<ComponentsType, 'type'>;

export type MessageType = {
    _id?: string;
    __v?: number;
    isMessageText: boolean;
    channelId?: string;
    messageText?: string;
    messageEmbed?: {
        description: string;
        title?: string;
        author?: {
            name?: string;
            picture?: string;
        };
        fields?: { name: string; value: string; inline?: boolean }[];
        footer?: string;
        thumbnail?: string;
    }
}

export type MessageActionRowComponent = {
    type: 'ACTION_ROW';
    components: ComponentsType[];
}

export interface MessageWithComponentsType extends MessageType {
    components: MessageActionRowComponent[];
}

export type WelcomeModuleType = MessageType;
export type MemberLeaveModuleType = MessageType;
export type WelcomeOrLeaveMemberLabelType = 'welcomeMember' | 'memberLeave';
export type WelcomeOrLeaveMemberType = WelcomeModuleType | MemberLeaveModuleType;
export type WelcomeOrMemberServiceType = typeof WelcomeMemberService | typeof MemberLeaveService;