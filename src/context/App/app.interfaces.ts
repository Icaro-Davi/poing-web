import { ReactNode } from "react";
import { BreakpointsMatch } from "../../hooks/useMatchMedia";
import { Locale, LocaleLang } from "../../locale/index.type";
import { AppDispatchStore, AppStateType } from "./app.types";

export interface IAppProvider {
    initialState: {
        locale: Locale;
        isAuthenticated: boolean;
        localeLang?: LocaleLang;
    };
    children: ReactNode;
}

export interface IAppContext {
    locale: Locale & { set: (locale: Locale) => void };
    store: AppStateType,
    dispatchStore: AppDispatchStore,
    layout: {
        breakpoints: BreakpointsMatch;
        isDesktopSize: boolean;
    }
}