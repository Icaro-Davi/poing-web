import axios from "axios";

const DiscordRequestor = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DISCORD_DASHBOARD_API,
    withCredentials: true
});

export default DiscordRequestor;