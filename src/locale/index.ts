import { getLocaleLang, setLocaleLang } from '../utils/cookies';

import type { GetServerSidePropsContext, NextPageContext } from 'next/types';
import type { Locale, LocaleLang } from "./index.type";

const availableLocales = ['pt-BR'];

const validateLocale = (localeLang: string) =>
    availableLocales.some(_localeLang => _localeLang === localeLang);

export const getAndValidateLocaleLang = (ctx?: NextPageContext | GetServerSidePropsContext) => {
    const urlLocaleLang = ctx?.query.locale as LocaleLang;
    if (urlLocaleLang && validateLocale(urlLocaleLang)) {
        setLocaleLang(urlLocaleLang, ctx);
        return {
            lang: urlLocaleLang,
            isUrlParam: true
        };
    } else {
        const localeLang = getLocaleLang(ctx) as LocaleLang;
        if (localeLang && validateLocale(localeLang))
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

export const getLocale = async (ctx?: NextPageContext | GetServerSidePropsContext): Promise<Locale> => {
    const locale = getAndValidateLocaleLang(ctx);
    return (await import(`../locale/${locale.lang}`)).default as Locale;
}