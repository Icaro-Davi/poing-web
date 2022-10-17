export type WelcomeModuleType = {
    _id: string;
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