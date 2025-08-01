import { createStore } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer.js'

const store = createStore(anecdoteReducer)

export default store
