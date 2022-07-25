import { ReactNode } from "react";
import { BreakpointsMatch } from "../../hooks/useMatchMedia";
import { Locale } from "../../locale/index.type";
import { AppDispatchStore, AppStateType } from "./app.types";

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
    dispatchStore: AppDispatchStore,
    layout: {
        breakpoints: BreakpointsMatch;
        pageLoaded: boolean;
    }
}