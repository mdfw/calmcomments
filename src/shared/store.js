import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import { accountReducer, formReducer, postsReducer, listenersReducer } from './reducers/';

const allReducers = combineReducers({
  account: accountReducer,
  routing: routerReducer,
  posts: postsReducer,
  forms: formReducer,
  listeners: listenersReducer,
});

const routerReduxMiddleware = routerMiddleware(browserHistory);

export default function configureStore(initialState) {
  const store = createStore(allReducers, initialState, composeWithDevTools(
    applyMiddleware(thunkMiddleware, routerReduxMiddleware),
  ));
  return store;
}
