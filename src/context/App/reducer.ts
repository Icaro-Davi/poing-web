import { AppAction, AppStateType } from "./app.types";

enum AppActions {
    SET_GUILDS = "SET_GUILDS"
}

export type AppActionKeys = keyof typeof AppActions;

function appReducer(state: AppStateType, action: AppAction<AppActionKeys>): AppStateType {
    switch (action.type) {
        case 'SET_GUILDS':
            if (!action?.payload?.guilds) return state;
            return { ...state, guilds: action.payload.guilds }
        default:
            return state;
    }
}

export default appReducer;