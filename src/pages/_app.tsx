import Providers, { InitialStateType } from '../context';

import type { AppContext, AppProps } from 'next/app';
import type { NextPageWithLayout } from '../utils/general.types';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  initialState: InitialStateType;
}

const App = ({ Component, pageProps, initialState, ...rest }: AppPropsWithLayout) => {
  console.log(pageProps)
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Providers {...{ initialState }}>
      {getLayout(<Component {...pageProps} />)}
    </Providers>
  );
}

App.getInitialProps = async ({ ctx, Component }: AppContext) => {

  const initialState = {} as any;
  if (typeof window === "undefined") {
    const isAuthenticated = (await import('../utils/auth/authenticate')).default;
    const { getAndValidateLocaleLang, getLocale } = (await import('../locale'));
    const locale = getAndValidateLocaleLang(ctx);

    initialState.locale = await getLocale(locale.lang);
    initialState.isAuthenticated = await isAuthenticated(ctx);
    ctx.query.isAuthenticated = initialState.isAuthenticated;

    if(!locale.isUrlParam){
      const { validateRootAndRedirect } = (await import('../utils/Routes'));
      validateRootAndRedirect(ctx, locale.lang);
    }
  }
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  return {
    initialState,
    pageProps
  };
}

export default App;
