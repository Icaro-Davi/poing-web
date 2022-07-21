import axios from "axios";
import { NextPageContext } from "next";
import { getAuthToken, removeAuthToken } from "../cookies";
import CookieKeys from "../cookies/keys";

async function authenticate(ctx: NextPageContext) {
    const authToken = await getAuthToken(ctx);
    try {
        await axios.get(`${process.env.NEXT_PUBLIC_DISCORD_DASHBOARD_API}/auth/status`, {
            headers: { Cookie: `${CookieKeys.AUTH_TOKEN}=${authToken}` }
        });
        return true;
    } catch (error) {
        removeAuthToken(ctx);
        console.error('[AUTH] Failed to authenticate');
        console.error(error);
        return false;
    }
}

export default authenticate;