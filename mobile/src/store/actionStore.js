import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import makeRootReducer from './reducers';
import {createLogger} from 'redux-logger';

const log = createLogger({diff: true, collapsed: true});
export default (initialState = {}) => {
  const middleWare = [thunk, log ];
  const enhancers = [];
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(applyMiddleware(...middleWare), ...enhancers),
  );
  return store;
};
