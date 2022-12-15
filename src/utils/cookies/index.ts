import Cookie, { CookieAttr } from 'cookies';
import jsCookie, { CookieAttributes } from 'js-cookie';
import CookieKeys from "./keys";

import type { GetServerSidePropsContext, NextPageContext, } from "next";
import { LocaleLang } from '../../locale/index.type';

type GetCookieFunc = (ctx?: NextPageContext | GetServerSidePropsContext) => string | undefined;

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

export function setCookie(key: CookieKeys, value: string, options?: CookieAttr, ctx?: NextPageContext | GetServerSidePropsContext) {
    if (ctx?.req && ctx?.res) {
        const cookie = new Cookie(ctx.req, ctx.res);
        cookie.set(key, value, options);
        return;
    }
    typeof window !== 'undefined' && jsCookie.set(key, value, options as CookieAttributes);
}

export function removeAuthToken(ctx?: NextPageContext | GetServerSidePropsContext) {
    removeCookie(CookieKeys.AUTH_TOKEN, ctx);
}


export const getAuthToken: GetCookieFunc = ctx => {
    return getCookie(CookieKeys.AUTH_TOKEN, ctx);
}

export const getLocaleLang: GetCookieFunc = ctx => {
    return getCookie(CookieKeys.LOCALE_LANG, ctx) || 'pt-BR';
}

export const setLocaleLang = (localeLang: LocaleLang, ctx?: NextPageContext | GetServerSidePropsContext) => {
    const expires = new Date(2147483647 * 1000);
    const cookieConfig = { maxAge: expires.getTime(), path: '/', httpOnly: false };
    setCookie(CookieKeys.LOCALE_LANG, localeLang, cookieConfig, ctx);
}