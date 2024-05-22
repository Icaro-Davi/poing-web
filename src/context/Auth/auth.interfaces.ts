import { ReactNode } from "react";
import { UserType } from "../../services/discord/user/user.types";

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
    user: UserType;
    logIn: Fn;
    logOut: Fn;
}