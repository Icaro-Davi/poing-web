import fs from 'fs';
import { Locale, LocaleLang } from "./index.type";

export const getLocale = async (localeLang: LocaleLang): Promise<Locale | undefined> => {
    if (!(typeof window === 'undefined')) throw new Error('Locale only works on server side.');
    const localePath = './src/locale';
    const fileLocaleName = fs.readdirSync(localePath).find(file => file.split('.')[0] === localeLang);
    if (!fileLocaleName) return;
    const locale = await import(`./${fileLocaleName}`)
    return locale.default;
}