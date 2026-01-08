import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducer.js'
import { delayedMessageMiddleware } from './exampleAddons/middleware.js'

// let preloadedState
//
// const persistedTodosString = localStorage.getItem('todos')
// if (persistedTodosString) {
//   preloadedState = {
//     todos: JSON.parse(persistedTodosString)
//   }
// }

const composedEnhancer = composeWithDevTools(
  applyMiddleware(delayedMessageMiddleware)
)

const store = createStore(rootReducer, composedEnhancer)

export default store
