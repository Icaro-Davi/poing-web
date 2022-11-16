import DiscordUserService from "../../services/discord/user";
import LocalStorage from "../../utils/localStorage";
import Notification from "../../components/Notification";
import BaseError from "../../utils/error/baseError";

import type { AppDispatchStore } from "./app.types";

class AppDispatch {
    static async findGuildAndSave(dispatch: AppDispatchStore) {
        try {
            const guilds = await DiscordUserService.getGuilds();
            if (guilds) {
                dispatch({ type: 'SET_GUILDS', payload: { guilds } });
                const lsGuildId = LocalStorage.guild.getSelectedId()
                const selectedGuildId = (lsGuildId && guilds.find(guild => guild.id === lsGuildId)?.id) || guilds.find(guild => guild.hasBot)?.id;
                if (selectedGuildId) {
                    this.setSelectedGuildId(dispatch, selectedGuildId);
                }
                return { selectedGuildId };
            }
        } catch (error) {
            new BaseError({
                origin: 'context.app.AppDispatch.findGuildAndSave',
                message: "Failed find user guilds",
                error,
                callback({ notifications }) {
                    Notification.open({
                        type: 'error',
                        ...notifications.error.guilds.find
                    });
                }
            })
        }
    }

    static async setSelectedGuildId(dispatch: AppDispatchStore, selectedGuildId: string) {
        dispatch({ type: 'SET_SELECTED_GUILD', payload: { selectedGuildId } });
        LocalStorage.guild.setSelectedId(selectedGuildId);
    }
}

export default AppDispatch;