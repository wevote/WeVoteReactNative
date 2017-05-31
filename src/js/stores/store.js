import {compose, createStore, applyMiddleware} from 'redux'
import {AsyncStorage} from 'react-native'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducers from '../reducers/reducers'
import {persistStore, autoRehydrate} from 'redux-persist';

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
  let store = createStore(
    reducers,
    compose(applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    ),autoRehydrate())
  )
  persistStore(store, {storage: AsyncStorage});
  return store;
}
