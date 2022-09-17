import Providers, { InitialStateType } from '../context';

import type { AppProps } from 'next/app';
import type { NextPageWithLayout } from '../utils/general.types';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  initialState: InitialStateType;
}

const App = ({ Component, pageProps, initialState, ...rest }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Providers {...pageProps}>
      {getLayout(<Component {...pageProps} />)}
    </Providers>
  );
}

export default App;
