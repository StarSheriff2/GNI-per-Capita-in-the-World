import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import gniWorldReducer from './gniWorld/gniWorld';
import countriesReducer from './countries/countries';

const reducer = combineReducers({
  gniWorld: gniWorldReducer,
  countries: countriesReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunk, logger),
);

export default store;
