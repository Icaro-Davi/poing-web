import { useState, useEffect } from 'react';
import DiscordGuildService from '../../services/discord/guild';
import { GuildChannel } from "../../services/discord/guild/guild.type";
import LocalStorage from "../../utils/localStorage";

function useChannels(selectedGuildId?: string) {
    const [channels, setChannels] = useState<GuildChannel[] | undefined>(LocalStorage.guild.getChannels()?.list);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        DiscordGuildService.getChannels()
            .then(_channels => {
                setChannels(_channels)
                setLoading(false);
            });
    }, [selectedGuildId]);

    return { channels, setChannels, isLoading };
}

export default useChannels;