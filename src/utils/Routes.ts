import Router from "next/router";
import { existsSync } from "fs";
import path from 'path';
import { NextPageContext } from "next";

/** Only in server side */
export const validateRootAndRedirect = (ctx: NextPageContext, localeLang: string) => {
    const rootPath = `${path.resolve(__dirname)}${process.env.NODE_ENV === 'production' ? '/..' : ''}/pages/[locale]${ctx.asPath}.js`;
    if (existsSync(rootPath)) {
        return Redirect(`/${localeLang}${ctx.asPath}`, ctx);
    }
}

export const Redirect = (to: string, ctx?: NextPageContext) => {
    try {
        if (typeof window !== 'undefined') {
            return Router.push(to);
        }
        if (ctx?.res && !ctx.res.headersSent) {
            ctx.res.writeHead(302, { Location: to });
            ctx.res.end();
            return;
        }
    } catch (error) {
        console.error('Redirect already sent route to', to);
    }
}