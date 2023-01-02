import fs from 'node:fs';
import path from 'node:path';
import { availableLocales } from '../locale';

// https://www.youtube.com/watch?v=xS9tOcFyWVs&ab_channel=MiguelRiquelme
type GetPageSitemapParams = { relativePath: string; localeFolderName: string, privateRoutes: string[] }
const getPageSitemap = ({ localeFolderName, privateRoutes, relativePath }: GetPageSitemapParams) => {

    const getAllPages = (relativePath: string,): string[] => {
        const browserAllFilesFromFolder = (nextPath: string, pathList: string[] = []): string[] => {
            let currentPath = path.resolve(nextPath);
            if (fs.lstatSync(currentPath).isDirectory()) {
                fs.readdirSync(currentPath).forEach(_path => {
                    if (fs.lstatSync(`${currentPath}/${_path}`).isDirectory()) {
                        pathList = [...pathList, ...browserAllFilesFromFolder(`${nextPath}/${_path}`)];
                    } else {
                        let pagePath = `/${nextPath}/${_path}`.replaceAll(new RegExp(`\\.tsx?|\\.js`, 'g'), '');
                        pathList.push(pagePath);
                    }
                });
            }
            return pathList;
        }
        return browserAllFilesFromFolder(relativePath);
    }

    const absolutePath = path.resolve(relativePath);
    const publicPageUrlList = fs
        .readdirSync(absolutePath)
        .filter(
            page => ![
                "index.tsx",
                "sitemaps.xml.tsx",
                "_app.tsx",
                "_document.tsx",
                "_error.tsx"
            ].includes(page)
        ).reduce((prev, current) => {
            prev = [...prev, ...getAllPages(`${relativePath}/${current}`)]
            return prev;
        }, [] as string[])
        .reduce((prev, current) => {
            let pageUrl = current.replaceAll(new RegExp(`(/${relativePath})(.+)`, 'g'), `${process.env.APP_DOMAIN}$2`).replace('index', '');
            prev = [
                ...prev,
                ...pageUrl.includes(localeFolderName)
                    ? availableLocales.map(localeLang => pageUrl.replace(localeFolderName, localeLang))
                    : [pageUrl]
            ]
            return prev;
        }, [] as string[])
        .filter(
            pageUrl => !privateRoutes.some(privateRoute => pageUrl.includes(privateRoute))
        );

    const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${publicPageUrlList.map(publicPageUrl => (
                `<url>
                    <loc>${publicPageUrl}</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>1.0</priority>
                </url>`
            )).join('\n')}
        </urlset>
    `.trim();

    return sitemap;
}

export default getPageSitemap;