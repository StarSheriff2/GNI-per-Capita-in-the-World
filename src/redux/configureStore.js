import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import gniWorldReducer from './gniWorld/gniWorld';
// import rocketsReducer from './rockets/rockets';

const reducer = combineReducers({
  gniWorld: gniWorldReducer,
  // missions: missionsReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunk, logger),
);

export default store;
