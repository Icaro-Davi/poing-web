import { GuildChannel } from "../../../../services/discord/guild/guild.type";

const handleChannels = (channels?: GuildChannel[]) => channels
    ?.filter(channel => channel.type === 'GUILD_TEXT')
    .map(channel => ({ label: `# ${channel.name}` || '', value: channel.id })) ?? [];

export default handleChannels;