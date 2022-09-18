import { NextApiHandler } from "next";
import { getLocale } from "../../../locale";

const findLocale: NextApiHandler = async (req, res) => {
    const { locale } = req.query;
    if (!locale) return res.status(400).send('Need a locale');

    const _locale = await getLocale();
    if (!_locale) return res.status(404).send('Locale not found');

    return res.status(200).send(_locale);
}

export default findLocale;