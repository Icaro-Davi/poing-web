import { NextPageContext } from "next";
import Router from "next/router";
import appRoutes from '../config/routes.json';

/** Only in server side */
export const handleRoutes = (ctx: NextPageContext, isAuthenticated: boolean) => {
    const route = appRoutes.find(route => route.path === ctx.asPath);
    if (!route) return;
    if (!isAuthenticated && !route.public) return Redirect('/', ctx);
    return;
}

export const Redirect = (to: string, ctx?: NextPageContext) => {
    if (typeof window !== 'undefined') {
        return Router.push(to);
    }
    if (ctx?.res) {
        ctx.res.writeHead(302, { Location: to });
        ctx.res.end();
        return;
    }
    return false;
}