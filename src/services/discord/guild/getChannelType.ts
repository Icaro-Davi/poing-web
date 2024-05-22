export enum ChannelType {
    GUILD_TEXT = 'GUILD_TEXT',
    DM = 'DM',
    GUILD_VOICE = 'GUILD_VOICE',
    GROUP_DM = 'GROUP_DM',
    GUILD_CATEGORY = 'GUILD_CATEGORY',
    GUILD_ANNOUNCEMENT = 'GUILD_ANNOUNCEMENT',
    ANNOUNCEMENT_THREAD = 'ANNOUNCEMENT_THREAD',
    PUBLIC_THREAD = 'PUBLIC_THREAD',
    PRIVATE_THREAD = 'PRIVATE_THREAD',
    GUILD_STAGE_VOICE = 'GUILD_STAGE_VOICE',
    GUILD_DIRECTORY = 'GUILD_DIRECTORY',
    GUILD_FORUM = 'GUILD_FORUM'
}

function getChannelType(type: number): keyof typeof ChannelType {
    switch (type) {
        case 0:
            return ChannelType.GUILD_TEXT;
        case 1:
            return ChannelType.DM;
        case 2:
            return ChannelType.GUILD_VOICE;
        case 3:
            return ChannelType.GROUP_DM;
        case 4:
            return ChannelType.GUILD_CATEGORY;
        case 5:
            return ChannelType.GUILD_ANNOUNCEMENT;
        case 10:
            return ChannelType.ANNOUNCEMENT_THREAD;
        case 11:
            return ChannelType.PUBLIC_THREAD;
        case 12:
            return ChannelType.PRIVATE_THREAD;
        case 13:
            return ChannelType.GUILD_STAGE_VOICE;
        case 14:
            return ChannelType.GUILD_DIRECTORY;
        case 15:
            return ChannelType.GUILD_FORUM;
        default:
            return ChannelType.GUILD_FORUM
    }
}

export default getChannelType;