import '../styles/globals.css';
import { Fragment } from 'react';
import type { AppContext, AppProps } from 'next/app';
import { getLocale } from '../locale';
import Providers, { InitialStateType } from '../context';

interface InitialValues extends AppProps {
  initialState: InitialStateType;
}

const App = ({ Component, pageProps, initialState }: InitialValues) => {
  return (
    <Fragment>
      <Providers {...{ initialState }}>
        <Component {...pageProps} />
      </Providers>
    </Fragment>
  );
}

App.getInitialProps = async ({ ctx, Component }: AppContext) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  const initialState = {} as any;
  if (typeof window === "undefined") {
    initialState.isAuthenticated = false;
    initialState.locale = await getLocale('pt_BR');
  }
  return {
    initialState,
    pageProps
  };
}

export default App;
