import fs from 'fs';
import { getLocaleLang, setLocaleLang } from '../utils/cookies';

import type { GetServerSidePropsContext, NextPageContext } from 'next/types';
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

export const getAndValidateLocaleLang = (ctx: NextPageContext | GetServerSidePropsContext) => {
    const urlLocaleLang = ctx.query.locale as LocaleLang;
    if (urlLocaleLang && availableLocales.some(localeLang => localeLang === urlLocaleLang)) {
        setLocaleLang(urlLocaleLang, ctx);
        return {
            lang: urlLocaleLang,
            isUrlParam: true
        };
    } else {
        const localeLang = getLocaleLang(ctx) as LocaleLang;
        if (localeLang && availableLocales.some(_localeLang => _localeLang === localeLang))
            return {
                lang: localeLang,
                isUrlParam: false
            };
    }
    return {
        lang: 'pt_BR' as LocaleLang,
        isUrlParam: false
    };
}