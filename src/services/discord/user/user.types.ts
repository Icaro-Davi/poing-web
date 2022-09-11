import { DiscordPermissionsTypes } from "../types";

export type UserGuildType = {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: string | DiscordPermissionsTypes[];
    features: string[];
    hasBot?: boolean;
}

export type UserType = {
    accent_color: null;
    avatar: string;
    avatar_decoration: null;
    banner: null;
    banner_color: null;
    discriminator: string;
    email: string;
    flags: number;
    id: string;
    locale: string;
    mfa_enabled: boolean;
    public_flags: number;
    username: string;
    verified: boolean;
}