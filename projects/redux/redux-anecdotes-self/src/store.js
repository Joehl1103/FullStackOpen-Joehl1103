import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer.js'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filterValue: filterReducer,
    notificationValue: notificationReducer
  }
})

export default store
