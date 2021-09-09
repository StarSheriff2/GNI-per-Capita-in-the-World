import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import gniWorldReducer from './gniWorld/gniWorld';
import detailsReducer from './details/details';

const reducer = combineReducers({
  gniWorld: gniWorldReducer,
  details: detailsReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunk, logger),
);

export default store;
