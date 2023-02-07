import { useState, useEffect } from 'react';
import DiscordGuildService from '../../services/discord/guild';
import { GuildChannel } from "../../services/discord/guild/guild.type";
import LocalStorage from "../../utils/localStorage";

function useChannels() {
    const [channels, setChannels] = useState<GuildChannel[] | undefined>(LocalStorage.guild.getChannels()?.list);
    useEffect(() => {
        DiscordGuildService.getChannels()
            .then(_channels => {
                setChannels(_channels)
            });
    }, []);
    return { channels, setChannels };
}

export default useChannels;