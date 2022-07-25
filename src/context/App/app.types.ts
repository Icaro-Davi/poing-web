import { Dispatch } from "react";
import { UserGuildType } from "../../services/discord/user/user.types"
import { AppActionKeys } from "./reducer";

export type AppStateType = {
    guilds: UserGuildType[];
    selectedGuildId: string;
}

export type AppAction<T> = {
    type: T;
    payload?: Partial<AppStateType>;
}

export type AppDispatchStore = Dispatch<AppAction<AppActionKeys>>;