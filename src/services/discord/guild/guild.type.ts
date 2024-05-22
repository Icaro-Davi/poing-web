import { UserType } from "../user/user.types";
import { ChannelType } from "./getChannelType";

type ForumTag = {
    id: string;
    name: string;
    moderated: boolean;
    emoji_id: string;
    emoji_name: string;
}

export type GuildChannel = {
    id: string;
    type: keyof typeof ChannelType;
    guild_id?: string;
    position?: number;
    permission_overwrites?: any[];
    name?: string;
    topic?: string;
    nsfw?: string;
    last_message_id?: string;
    bitrate?: string;
    user_limit?: number;
    rate_limit_per_user?: number;
    recipients?: UserType[];
    icon?: string;
    owner_id?: string;
    application_id?: string;
    parent_id?: string;
    last_pin_timestamp?: number;
    rtc_region?: string;
    video_quality_mode?: number;
    message_count?: number;
    member_count?: number;
    thread_metadata?: any[];
    member?: any[];
    default_auto_archive_duration?: number;
    permissions?: string;
    flags?: number;
    total_message_sent?: number;
    available_tags?: ForumTag[];
    applied_tags?: string[];
    default_reaction_emoji?: { emoji_id: string; emoji_name: string };
    default_thread_rate_limit_per_user?: number;
    default_sort_order?: number;
}