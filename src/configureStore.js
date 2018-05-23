import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import list from './pages/List/reducer';

const logger = createLogger({
  collapsed: true,
});

export default function configureStore(initialState) {
  const store = createStore(
    combineReducers({
      list,
    }),
    initialState,
    applyMiddleware(
      thunkMiddleware,
      logger,
    ),
  );

  return store;
}
