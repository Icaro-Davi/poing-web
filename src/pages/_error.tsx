import Error from 'next/error';
import { NextPage } from "next"
import { getAndValidateLocaleLang } from "../locale";

interface IProps {
    statusCode: number;
}

const ErrorPage: NextPage<IProps> = props => {
    return <Error statusCode={props.statusCode} />
}

ErrorPage.getInitialProps = async ctx => {
    const locale = getAndValidateLocaleLang(ctx);
    if (!locale.isUrlParam) {
        const { validateRootAndRedirect } = (await import('../utils/Routes'));
        validateRootAndRedirect(ctx, locale.lang);
    }
    const statusCode = ctx?.res ? ctx?.res.statusCode : ctx.err ? ctx.err.statusCode ?? 500 : 404;
    return { statusCode }
}

export default ErrorPage;