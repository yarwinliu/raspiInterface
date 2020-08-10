
import { createStore, applyMiddleware, Middleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {rootReducer} from 'store/ducks'

const middleware: Middleware[] = [ thunk, logger ]

export const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
)
