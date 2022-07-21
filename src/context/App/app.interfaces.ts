import { Dispatch, ReactNode } from "react";
import { BreakpointsMatch } from "../../hooks/useMatchMedia";
import { Locale } from "../../locale/index.type";
import { AppAction, AppStateType } from "./app.types";
import { AppActionKeys } from "./reducer";

export interface IAppProvider {
    initialState: {
        locale: Locale;
        isAuthenticated: boolean;
    };
    children: ReactNode;
}

export interface IAppContext {
    locale: Locale & { set: (locale: Locale) => void };
    store: AppStateType,
    dispatchStore: Dispatch<AppAction<AppActionKeys>>,
    layout: {
        breakpoints: BreakpointsMatch;
        pageLoaded: boolean;
    }
}