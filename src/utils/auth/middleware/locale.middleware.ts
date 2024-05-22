import { getLocale } from "../../../locale";
import { Locale } from "../../../locale/index.type";
import type { GetServerSideProps } from "next/types";

const LocalePageMiddleware = (callback: (locale: Locale) => { [key: string]: any }) => {
    const middleware: GetServerSideProps = async context => {
        const locale = await getLocale(context);
        return { props: callback(locale) }
    }
    return middleware;
}

export default LocalePageMiddleware;