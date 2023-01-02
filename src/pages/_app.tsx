import Head from 'next/head';
import { Fragment } from 'react';
import Providers, { InitialStateType } from '../context';
import { BOT } from '../locale/defaultBoTInfo';

import type { AppProps } from 'next/app';
import type { NextPageWithLayout } from '../utils/general.types';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  initialState: InitialStateType;
}

const App = ({ Component, pageProps, initialState, ...rest }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Fragment>
      <Head>
        <title>{pageProps?.pageHead?.title ?? BOT.name}</title>
        {pageProps?.pageHead?.description && (
          <meta name="description" content={pageProps.pageHead.description}></meta>
        )}
      </Head>
      <Providers {...pageProps}>
        {getLayout(<Component {...pageProps} />)}
      </Providers>
    </Fragment>
  );
}

export default App;
