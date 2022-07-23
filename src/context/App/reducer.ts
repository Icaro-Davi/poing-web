import { AppAction, AppStateType } from "./app.types";

enum AppActions {
    SET_GUILDS = 'SET_GUILDS',
    SET_SELECTED_GUILD = 'SET_SELECTED_GUILD'
}

export type AppActionKeys = keyof typeof AppActions;

function appReducer(state: AppStateType, action: AppAction<AppActionKeys>): AppStateType {
    switch (action.type) {
        case 'SET_GUILDS':
            if (!action?.payload?.guilds) return state;
            return { ...state, guilds: action.payload.guilds };
        case 'SET_SELECTED_GUILD':
            if (!action.payload?.selectedGuildId) return state;
            return { ...state, selectedGuildId: action.payload.selectedGuildId };
        default:
            return state;
    }
}

export default appReducer;