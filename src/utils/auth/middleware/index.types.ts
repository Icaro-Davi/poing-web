import type { GetServerSidePropsContext, PreviewData } from "next/types";
import type { ParsedUrlQuery } from "querystring";

export type MiddlewareFunc = (
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
    options?: { initialState: { isAuth: boolean, localeLang: string; } }
) => Promise<{ [key: string]: any }>;