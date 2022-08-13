import { AppDispatchStore } from "./app.types";
import DiscordUserService from "../../services/discord/user";
import LocalStorage from "../../utils/localStorage";
import Notification from "../../components/Notification";

class AppDispatch {
    static async findGuildAndSave(dispatch: AppDispatchStore) {
        try {
            const guilds = await DiscordUserService.getGuilds();
            if (guilds) {
                dispatch({ type: 'SET_GUILDS', payload: { guilds } });
                const lsGuildId = LocalStorage.guild.getSelectedId()
                const selectedGuildId = (lsGuildId && guilds.find(guild => guild.id === lsGuildId)?.id) || guilds[0].id;
                dispatch({ type: 'SET_SELECTED_GUILD', payload: { selectedGuildId } });
                LocalStorage.guild.setSelectedId(selectedGuildId);
            }
        } catch (error) {
            console.error(error);
            Notification.open({
                title: 'Error',
                description: 'Erro ao buscar a lista de guilds',
                type: 'error'
            });
        }
    }

    static async setSelectedGuildId(dispatch: AppDispatchStore, selectedGuildId: string) {
        dispatch({ type: 'SET_SELECTED_GUILD', payload: { selectedGuildId } });
        LocalStorage.guild.setSelectedId(selectedGuildId);
    }
}

export default AppDispatch;