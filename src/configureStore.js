import {applyMiddleware, combineReducers, createStore} from 'redux'
import {routerMiddleware, routerReducer} from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import list from './pages/List/reducer'

const logger = createLogger({
  collapsed: true,
})

export default function configureStore (initialState, history) {
  const store = createStore(
    combineReducers({
      list,
      routing: routerReducer,
    }),
    initialState,
    applyMiddleware(
      routerMiddleware(history),
      thunkMiddleware,
      logger,
    ),
  )

  return store
}
