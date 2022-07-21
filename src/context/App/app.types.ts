import { UserGuildType } from "../../services/discord/user/user.types"

export type AppStateType = {
    guilds: UserGuildType[];
}

export type AppAction<T> = {
    type: T;
    payload?: Partial<AppStateType>;
}