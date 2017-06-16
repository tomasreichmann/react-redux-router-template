import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import { App, Home, About, DevTools } from './modules';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';


const reduxRouterMiddleware = routerMiddleware(browserHistory);

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer,
  }),
  {},
  compose(
    applyMiddleware(reduxRouterMiddleware),
    DevTools.instrument()
  ),
);

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} >
        <IndexRoute component={Home} />
        <Route path="/about" component={About} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);