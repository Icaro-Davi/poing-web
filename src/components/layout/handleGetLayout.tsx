import { ComponentType, ReactElement } from "react";

type ObjectType = { [key: string]: any };

type LayoutOptions<P> = {
    initialProps: P;
}

function handleGetLayout<P = ObjectType>(Layout: ComponentType<any>, options?: Partial<LayoutOptions<P>>) {
    const initialProps = options?.initialProps || {};
    const getLayout = (page: ReactElement) => (
        <Layout {...initialProps} >
            {page}
        </Layout>
    );
    return getLayout;
}

export default handleGetLayout;