import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import app from '../reducers/reducers'

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
  return createStore(
    app,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}
