import { GuildChannel } from "../guild/guild.type";
import { DiscordPermissionsTypes } from "../types";

export type GuildRole = {
    id: string;
    name: string;
    permissions: string;
    position: number;
    color: number;
    hoist: boolean;
    managed: boolean;
    mentionable: boolean;
    icon?: any;
    unicode_emoji?: any;
    flags: number;
    tags: { bot_id: string; };
};

export type UserGuildType = {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: string | DiscordPermissionsTypes[];
    features: string[];
    hasBot?: boolean;
    roles: GuildRole[];
    channels?: {
        list: GuildChannel[];
        nextFetch: number;
    }
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