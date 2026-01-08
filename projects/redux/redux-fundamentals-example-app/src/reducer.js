import { combineReducers } from 'redux'

import todosReducer from './features/todosSlice.js'
import filtersReducer from './features/filtersSlice.js'

const rootReducer = combineReducers({
  todos: todosReducer,
  filters: filtersReducer
})

export default rootReducer
