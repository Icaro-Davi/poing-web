import fs from 'fs';
import { getLocaleLang, setCookie } from '../utils/cookies';
import CookieKeys from '../utils/cookies/keys';

import type { NextPageContext } from 'next/types';
import type { Locale, LocaleLang } from "./index.type";

const availableLocales = ['pt-BR'];

export const getLocale = async (localeLang: LocaleLang): Promise<Locale | undefined> => {
    if (!(typeof window === 'undefined')) throw new Error('Locale only works on server side.');
    const localePath = './src/locale';
    const fileLocaleName = fs.readdirSync(localePath).find(file => file.split('.')[0] === localeLang);
    if (!fileLocaleName) return;
    const locale = await import(`./${fileLocaleName}`)
    return locale.default;
}

export const handlePageLocale = async (ctx: NextPageContext) => {
    const localeLang = getLocaleLang(ctx) as LocaleLang;
    if (localeLang && availableLocales.some(_localeLang => _localeLang === localeLang)) return await getLocale(localeLang);
    if (!ctx.req) return await getLocale('pt-BR');
    const headerLanguageIndex = ctx.req.rawHeaders.findIndex(header => header === 'Accept-Language');
    if (headerLanguageIndex > -1) {
        const userBrowserLocale = ctx.req.rawHeaders[headerLanguageIndex + 1].split(',')[0] as LocaleLang;
        if (availableLocales.some(localeLang => localeLang === userBrowserLocale)) {
            setCookie(CookieKeys.LOCALE_LANG, userBrowserLocale, ctx);
            return await getLocale(userBrowserLocale);
        }
    }
    return await getLocale('pt-BR');
}