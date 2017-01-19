import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Component } from 'react';

import { Router, Route, browserHistory } from 'react-router';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import reducers from './modules';
import Home from './components/Home';
import MainLayout from './components/MainLayout';

import './index.css';


const routingMiddleware = routerMiddleware(browserHistory);

// tslint:disable-next-line
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(thunk),
  applyMiddleware(routingMiddleware),
);
const allReducers = {
  ...reducers,
  routing: routerReducer,
};
const store = createStore(combineReducers(allReducers), enhancers);
const history = syncHistoryWithStore(browserHistory, store);


class App extends Component<null, null> {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route component={MainLayout}>
            <Route path="*" component={Home} />
          </Route>
        </Router>
      </Provider>
    );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
