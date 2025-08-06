import middlewareReducer from "./middlewareReducer"
import { initialState, asObject } from "../utils/initialState"
import { createSlice, current } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: initialState,
  reducers: {
    upvote(state, action) {
      const anecdoteId = action.payload
      // console.log('anecdoteId', anecdoteId)
      const stateCopy = [...state]
      // console.log('stateCopy', stateCopy)
      const anecdoteToChange = stateCopy.filter(a => a.id === anecdoteId)[0]
      // console.log('anecdoteToChange', anecdoteToChange)
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
    setNotes(state, action) {
      return action.payload
    }
  }
})

export const { upvote, createNote, setNotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
