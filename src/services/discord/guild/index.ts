import LocalStorage from "../../../utils/localStorage";
import DiscordRequestor from "../requestor";
import getChannelType from "./getChannelType";
import { GuildChannel } from "./guild.type";

class DiscordGuildService {
    static basePath = 'guild';

    static async getChannels() {
        const handleChannels = (channels: Omit<GuildChannel, 'type'> & { type: number; }[]) => channels.map(channel => ({
            ...channel,
            type: getChannelType(channel.type)
        })) as GuildChannel[];
        try {
            const localChannels = LocalStorage.guild.getChannels();
            if (localChannels && localChannels.nextFetch > Date.now()) {
                if (localChannels) return localChannels.list;
            }

            const guildId = LocalStorage.guild.getSelectedId();
            const { data } = await DiscordRequestor.get<Omit<GuildChannel, 'type'> & { type: number }[]>(`${this.basePath}/${guildId}/channels`);
            const channels = handleChannels(data);
            LocalStorage.guild.setChannels(channels, { updateFetchDate: true });
            return channels;
        } catch (error) {
            throw error;
        }
    }

}

export default DiscordGuildService;