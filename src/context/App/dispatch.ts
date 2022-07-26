import { AppDispatchStore } from "./app.types";
import DiscordUserService from "../../services/discord/user";
import LocalStorage from "../../utils/localStorage";

class AppDispatch {
    static async findGuildAndSave(dispatch: AppDispatchStore) {
        try {
            const guilds = await DiscordUserService.getGuilds();
            if (guilds) {
                dispatch({ type: 'SET_GUILDS', payload: { guilds } });
                const selectedGuildId = LocalStorage.guild.getSelectedId() || guilds[0].id;
                dispatch({ type: 'SET_SELECTED_GUILD', payload: { selectedGuildId } });
                LocalStorage.guild.setSelectedId(selectedGuildId);
            }
        } catch (error) {
            throw error;
        }
    }

    static async setSelectedGuildId(dispatch: AppDispatchStore, selectedGuildId: string) {
        dispatch({ type: 'SET_SELECTED_GUILD', payload: { selectedGuildId } });
        LocalStorage.guild.setSelectedId(selectedGuildId);
    }
}

export default AppDispatch;