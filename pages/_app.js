// Redux/persist dependencies
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import App from 'next/app';

// import '../.semantic/dist/semantic.min.css';
import 'semantic-ui-css/semantic.min.css';

import { wrapper } from '../redux/store';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  return (
    // <Provider store={store}>
    <PersistGate loading={<div>loading</div>} persistor={store.__persistor}>
      <Component {...pageProps} />
    </PersistGate>
    // </Provider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  return { pageProps };
};

export default wrapper.withRedux(MyApp);
