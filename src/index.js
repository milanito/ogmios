import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';

import i18n from './i18n';
import reducers from './reducers';
import routes from './routes';

import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({ type: 'AUTH_USER' });
}

ReactDOM.render(
  <MuiThemeProvider>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Router history={createBrowserHistory()}>
        {routes}
        </Router>
      </Provider>
    </I18nextProvider>
  </MuiThemeProvider>, document.getElementById('root'));

registerServiceWorker();
