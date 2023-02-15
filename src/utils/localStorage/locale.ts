import { Locale, LocaleLang } from "../../locale/index.type";
import LocalStorageKeys from "./keys"

const getAllLocales = () => {
    if (typeof localStorage === 'undefined') return;
    const locale = JSON.parse(localStorage?.getItem(LocalStorageKeys.LOCALE) ?? '{}') as Record<LocaleLang, Locale>;
    return locale;
}

const getLocaleByLang = (lang: LocaleLang) => {
    if (typeof localStorage === 'undefined') return;
    const locale = JSON.parse(localStorage?.getItem(LocalStorageKeys.LOCALE) ?? '{}') as Record<LocaleLang, Locale>;
    return locale?.[lang];
}

const saveLocale = (locale: Locale) => {
    if (typeof localStorage === 'undefined') return;
    const locales = getAllLocales() ?? {};
    localStorage?.setItem(LocalStorageKeys.LOCALE, JSON.stringify({ ...locales, [locale.lang]: locale }));
}

export default {
    getAllLocales,
    getLocaleByLang,
    saveLocale
}