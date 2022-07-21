import type { AppContext, AppProps } from 'next/app';
import { getLocale } from '../locale';
import Providers, { InitialStateType } from '../context';

interface InitialValues extends AppProps {
  initialState: InitialStateType;
}

const App = ({ Component, pageProps, initialState }: InitialValues) => {
  return (
    <Providers {...{ initialState }}>
      <Component {...pageProps} />
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
    initialState.locale = await getLocale('pt_BR');
    handleRoutes(ctx, !!initialState.isAuthenticated);
  }
  return {
    initialState,
    pageProps
  };
}

export default App;
