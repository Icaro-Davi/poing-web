import { GetServerSideProps } from 'next';
import getPageSitemap from '../utils/generateSitemap';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    if (!process.env.APP_DOMAIN) throw 'Error on get domain';
    if (ctx.query.bypass_key !== process.env.SITEMAPS_URL_BYPASS_KEY)
        return {
            props: {},
            redirect: {
                destination: '/',
            }
        }

    const relativePath = 'src/pages';
    const localeFolderName = '[locale]';
    const privateRoutes = ['/dashboard'];
    const sitemap = getPageSitemap({ localeFolderName, privateRoutes, relativePath });

    const res = ctx.res;
    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return { props: {} }
}

export default function Sitemaps() { }