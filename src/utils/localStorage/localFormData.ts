import LocalGuild from "./guild";
import { MessageWithComponentsType } from "../../services/discord/modules/modules.types"

export type LocalFormData = {
    form?: {
        roleByInteraction?: MessageWithComponentsType;
    }
}

const get = () => {
    const guild = LocalGuild.getGuilds(LocalGuild.getSelectedGuild());
    return guild.localFormData;
}

const set = (data: LocalFormData) => {
    const selectedGuildId = LocalGuild.getSelectedGuild();
    const guilds = LocalGuild.getGuilds();
    LocalGuild.setGuilds(guilds.map(guild => {
        if (guild.id === selectedGuildId)
            return { ...guild, localFormData: data }
        return guild;
    }));
}

export default {
    get,
    set
}