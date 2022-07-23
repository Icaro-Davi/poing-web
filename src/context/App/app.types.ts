import { UserGuildType } from "../../services/discord/user/user.types"

export type AppStateType = {
    guilds: UserGuildType[];
    selectedGuildId: string;
}

export type AppAction<T> = {
    type: T;
    payload?: Partial<AppStateType>;
}