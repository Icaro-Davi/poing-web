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