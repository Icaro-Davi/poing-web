import LocalStorageKeys from "./keys";

const setSelectedGuild = (guildId: string) => localStorage.setItem(LocalStorageKeys.SELECTED_GUILD_ID, guildId);
const getSelectedGuild = () => localStorage.getItem(LocalStorageKeys.SELECTED_GUILD_ID);

const LocalStorage = {
    guild: {
        getSelectedId: getSelectedGuild,
        setSelectedId: setSelectedGuild
    }
}

export default LocalStorage;