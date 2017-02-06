import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from '../containers/App';
import Home from '../containers/Home';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';

export default function buildRoutes(store = {}) {
  // const state = store.getState();
  let history = browserHistory;

  if (store) {
    history = syncHistoryWithStore(browserHistory, store);
  }

  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute
          component={Home}
        />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={RegisterPage} />
      </Route>
    </Router>
  );
}
