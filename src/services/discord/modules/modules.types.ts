import { MemberLeaveService, WelcomeMemberService } from "./welcomeOrLeaveMember";

type DefaultMemberModuleType = {
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

export type WelcomeModuleType = DefaultMemberModuleType;
export type MemberLeaveModuleType = DefaultMemberModuleType;
export type WelcomeOrLeaveMemberType = WelcomeModuleType | MemberLeaveModuleType;
export type WelcomeOrMemberServiceType = typeof WelcomeMemberService | typeof MemberLeaveService;