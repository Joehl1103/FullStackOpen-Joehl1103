import middlewareReducer from "./middlewareReducer"
import { initialState } from "../utils/initialState"

export const voteAction = (id) => {
  return {
    type: 'UPVOTE',
    payload: id
  }
}

export const addNewAnecdoteAction = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: { content: content }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPVOTE':
      const anecdoteId = action.payload
      console.log('anecdoteId', anecdoteId)
      const stateCopy = [...state]
      console.log('stateCopy', stateCopy)
      const anecdoteToChange = stateCopy.filter(a => a.id === anecdoteId)[0]
      console.log('anecdoteToChange', anecdoteToChange)
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

    case 'NEW_NOTE':
      console.log('action payload content', action.payload.content)
      return [...state].concat(asObject(action.payload.content))
    default:
      return state
  }
}

export default reducer
