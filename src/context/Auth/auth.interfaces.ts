import { ReactNode } from "react";

type Fn = () => void;

export interface IAuthProvider {
    children: ReactNode;
    initialState: {
        isAuthenticated: boolean;
    };
}

export interface IAuthContext {
    isAuthenticated: boolean;
    discordAuthUrl: string;
    logIn: Fn;
    logOut: Fn;
}