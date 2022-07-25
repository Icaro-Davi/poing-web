import { AppDispatchStore } from "./app.types";
import DiscordUserService from "../../services/discord/user";

class AppDispatch {
    static async findGuildAndSave(dispatch: AppDispatchStore) {
        try {
            const guilds = await DiscordUserService.getGuilds();
            dispatch({ type: 'SET_GUILDS', payload: { guilds } });
        } catch (error) {
            throw error;
        }
    }
}

export default AppDispatch;