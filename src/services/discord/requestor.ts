import axios from "axios";
import CookieKeys from "../../utils/cookies/keys";
import { getCookie } from "../../utils/cookies";

const DiscordRequestor = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DISCORD_DASHBOARD_API,
    withCredentials: true,
});

DiscordRequestor.interceptors.request.use((config) => {
    const authCookie = getCookie(CookieKeys.AUTH_TOKEN);
    const authToken = getCookie(CookieKeys.AUTH_JWT);
    config.headers = {
        ...config.headers,
        ...authCookie ? { 'cookies': `${CookieKeys.AUTH_TOKEN}=${authCookie}` } : {},
        ...(!authCookie && authToken) ? { 'Authorization': `Bearer ${authToken}` } : {},
    }
    return config;
}, err => Promise.reject(err));

export default DiscordRequestor;