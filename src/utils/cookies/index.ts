import Cookie from 'cookies';
import jsCookie from 'js-cookie';
import CookieKeys from "./keys";

import type{ GetServerSidePropsContext, NextPageContext, } from "next";

export function getCookie(key: string, ctx?: NextPageContext | GetServerSidePropsContext): string | undefined {
    if (ctx?.req && ctx?.res) {
        const cookie = new Cookie(ctx.req, ctx.res);
        return cookie.get(key);
    }
    return jsCookie.get(key);
}

export function removeCookie(key: string, ctx?: NextPageContext | GetServerSidePropsContext) {
    if (ctx?.req && ctx?.res) {
        const cookie = new Cookie(ctx.req, ctx.res);
        cookie.set(key, '', { maxAge: 1 });
    }
    jsCookie.remove(key);
}

export function getAuthToken(ctx?: NextPageContext | GetServerSidePropsContext): string | undefined {
    return getCookie(CookieKeys.AUTH_TOKEN, ctx);
}

export function removeAuthToken(ctx?: NextPageContext | GetServerSidePropsContext){
    removeCookie(CookieKeys.AUTH_TOKEN, ctx);
}