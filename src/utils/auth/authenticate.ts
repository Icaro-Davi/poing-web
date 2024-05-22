import axios, { AxiosError } from 'axios';
import { getAuthToken, removeAuthToken } from '../cookies';
import { getAndValidateLocaleLang } from '../../locale';
import CookieKeys from '../cookies/keys';

import type { NextPageContext } from "next";
import type { GetServerSideProps, GetServerSidePropsContext } from "next/types";

async function isAuthenticated(ctx?: NextPageContext | GetServerSidePropsContext) {
    const authToken = await getAuthToken(ctx);
    try {
        if (!authToken) return false;
        if (ctx && typeof window === 'undefined') {
            const url = `${process.env.NEXT_PUBLIC_DISCORD_DASHBOARD_API}/auth/status`;
            await axios.get(url, {
                headers: {
                    'Cookie': `${CookieKeys.AUTH_TOKEN}=${authToken}`,
                },
                withCredentials: true,
            });
        }
        return true;
    } catch (error) {
        console.error('[AUTH] Failed to authenticate');
        if (error instanceof AxiosError) {
            // if (error.code === '401') removeAuthToken(ctx);
        } else {
            console.error(error);
        }
        return false;
    }
}

const authenticationHof = async (context: GetServerSidePropsContext) => {
    const isAuth = await isAuthenticated(context);
    const locale = await getAndValidateLocaleLang(context);

    return { isAuth, locale }
}

export const withPrivatePage = (callback?: GetServerSideProps) => {
    const getServerSideProps: GetServerSideProps = async context => {
        const { isAuth, locale } = await authenticationHof(context);
        const { props, ...serverSideConf } = (callback ? await callback(context) : { props: {} }) as { [key: string]: any, props: any };
        return {
            notFound: !locale.isUrlParam || !isAuth,
            props: { ...props, initialState: { isAuthenticated: isAuth, localeLang: locale.lang } },
            ...serverSideConf
        }
    }
    return getServerSideProps;
}

export const withPublicPage = (callback?: GetServerSideProps) => {
    const getServerSideProps: GetServerSideProps = async context => {
        const locale = await getAndValidateLocaleLang(context);
        const { props, ...serverSideConf } = (callback ? await callback(context) : { props: {} }) as { [key: string]: any };
        return {
            notFound: !locale.isUrlParam,
            props: { ...props, initialState: { localeLang: locale.lang } },
            ...serverSideConf
        }
    }
    return getServerSideProps;
}

export default isAuthenticated;