export type GuildSettingsType = {
    _id: string;
    bot: {
        prefix: string,
        locale: 'pt-BR' | 'en-US';
        messageEmbedHexColor: string;
        roles: {
            muteId: string;
        },
    }
    createdAt: string;
    updatedAt: string;
}