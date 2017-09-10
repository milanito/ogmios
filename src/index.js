import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { persistStore, autoRehydrate } from 'redux-persist';
import { compose, createStore, applyMiddleware } from 'redux';

import i18n from './i18n';
import reducers from './reducers';
import routes from './routes';
import history from './history';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers, undefined,
  compose(applyMiddleware(reduxThunk), autoRehydrate()));

persistStore(store);

const theme = createMuiTheme();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Router history={history}>
        {routes}
        </Router>
      </Provider>
    </I18nextProvider>
  </MuiThemeProvider>, document.getElementById('root'));

registerServiceWorker();
