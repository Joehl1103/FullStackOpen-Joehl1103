import middlewareReducer from "./middlewareReducer"
import { initialState, asObject } from "../utils/initialState"
import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes.js'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: initialState,
  reducers: {
    upvote(state, action) {
      const anecdoteId = action.payload
      const stateCopy = [...state]
      const anecdoteToChange = stateCopy.filter(a => a.id === anecdoteId)[0]
      const newAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      const stateCopyMod = stateCopy.map(anecdote => {
        if (anecdote.id === anecdoteId) {
          anecdote = newAnecdote
          return anecdote
        } else {
          return anecdote
        }
      })
      return middlewareReducer(stateCopyMod, { type: 'SORT' })

    },
    addAnecdote(state, action) {
      const newNote = asObject(action.payload)
      return state.concat(newNote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { upvote, setAnecdotes, addAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch(setAnecdotes(notes))

  }
}

export const addNewAnecdote = (content) => {
  return async dispatch => {
    await anecdoteService.addAnecdote({ content: content, votes: 0 })
    dispatch(addAnecdote(content))
  }
}
export default anecdoteSlice.reducer
