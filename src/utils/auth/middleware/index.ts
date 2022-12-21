import type { GetServerSideProps } from "next/types";
import type { MiddlewareFunc } from "./index.types";

function PageMiddleware(middlewareList: MiddlewareFunc[]) {
    const getServerSideProps: GetServerSideProps = async (context) => {
        const promises = await Promise.all(middlewareList.map(func => func(context)));
        let data: { [key: string]: any } = {};
        promises.forEach(promise => { data = { ...data, ...promise.props } });
        return { props: data };
    }
    return getServerSideProps;
}

export default PageMiddleware;