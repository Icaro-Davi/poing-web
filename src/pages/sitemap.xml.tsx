import { GetServerSideProps } from 'next';
import getPageSitemap from '../utils/generateSitemap';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const relativePath = 'src/pages';
    const localeFolderName = '[locale]';
    const privateRoutes = ['/dashboard'];
    const sitemap = getPageSitemap({ localeFolderName, privateRoutes, relativePath });

    const res = ctx.res;
    res.setHeader('Content-Type', 'text/xml; charset=UTF-8');
    res.write(sitemap);
    res.end();

    return { props: {} }
}

export default function Sitemaps() { }