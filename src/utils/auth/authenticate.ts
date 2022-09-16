import axios from "axios";
import { NextPageContext } from "next";
import { GetServerSideProps } from "next/types";
import { getAndValidateLocaleLang } from "../../locale";
import { getAuthToken, removeAuthToken } from "../cookies";
import CookieKeys from "../cookies/keys";

async function isAuthenticated(ctx: NextPageContext) {
    const authToken = await getAuthToken(ctx);
    try {
        await axios.get(`${process.env.NEXT_PUBLIC_DISCORD_DASHBOARD_API}/auth/status`, {
            headers: { Cookie: `${CookieKeys.AUTH_TOKEN}=${authToken}` }
        });
        return true;
    } catch (error) {
        removeAuthToken(ctx);
        console.error('[AUTH] Failed to authenticate');
        console.error(error);
        return false;
    }
}

export const withPrivatePage = (callback?: GetServerSideProps) => {
    const getServerSideProps: GetServerSideProps = async context => {
        const { props, ...serverSideConf } = (callback ? await callback(context) : { props: {} }) as { [key: string]: string, props: any };
        const locale = getAndValidateLocaleLang(context);
        return {
            notFound: !locale.isUrlParam || !context.query.isAuthenticated,
            props: { ...props },
            ...serverSideConf
        }
    }
    return getServerSideProps;
}

export const withPublicPage = (callback?: GetServerSideProps) => {
    const getServerSideProps: GetServerSideProps = async context => {
        const serverSideConf = callback ? await callback(context) : {};
        const locale = getAndValidateLocaleLang(context);
        return {
            notFound: !locale.isUrlParam,
            props: {},
            ...serverSideConf
        }
    }
    return getServerSideProps;
}

export default isAuthenticated;