import { handlePageLocale } from '../locale';
import Providers, { InitialStateType } from '../context';

import type { AppContext, AppProps } from 'next/app';
import type { NextPageWithLayout } from '../utils/general.types';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  initialState: InitialStateType;
}

const App = ({ Component, pageProps, initialState }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Providers {...{ initialState }}>
      {getLayout(<Component {...pageProps} />)}
    </Providers>
  );
}

App.getInitialProps = async ({ ctx, Component }: AppContext) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  const initialState = {} as any;
  if (typeof window === "undefined") {
    const { handleRoutes } = (await import('../utils/Routes'));
    const authenticate = (await import('../utils/auth/authenticate')).default;

    initialState.isAuthenticated = await authenticate(ctx);
    initialState.locale = await handlePageLocale(ctx);
    handleRoutes(ctx, !!initialState.isAuthenticated);
  }
  return {
    initialState,
    pageProps
  };
}

export default App;
