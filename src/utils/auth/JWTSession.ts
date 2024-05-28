import type { GetServerSidePropsContext, NextPageContext } from "next";
import { getAuthToken, setCookie } from "../cookies";
import CookieKeys from "../cookies/keys";

const JWTSession = (ctx: NextPageContext | GetServerSidePropsContext): void => {
    if (getAuthToken(ctx)) return;

    const userJWT = ctx.query['user-token'];
    if (typeof userJWT === 'string')
        setCookie(CookieKeys.AUTH_JWT, userJWT, { sameSite: 'strict', overwrite: true, httpOnly: false }, ctx);
}

export default JWTSession;