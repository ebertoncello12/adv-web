import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import routes from './config/routes.jsx';
import { Provider } from 'react-redux';
import store from './store';

import { GlobalStyle } from './styles/style.js';
import React from 'react';
import LoadingWrapper from './components/loading/LoadingWrapper.jsx';
import LoadingIndicator from './components/loading/LoadingIndicator.jsx';
import { LoadingProvider } from './hooks/LoadingContext.jsx';

const App = () => {
  const { currentUser } = store.getState().user;
  const routing = useRoutes(routes(currentUser));

  return (
    <Provider store={store}>
      <LoadingProvider>
        <LoadingIndicator />
        <LoadingWrapper>
          <GlobalStyle />
          {routing}
        </LoadingWrapper>
      </LoadingProvider>
    </Provider>
  );
};

export default App;
