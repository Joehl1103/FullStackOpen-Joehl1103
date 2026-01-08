import deepFreeze from 'deep-freeze'
import anecdoteReducer from './anecdoteReducer.js'
import store from '../store.js'

describe('anecdote reducer', () => {
  const initialState = [
    {
      content: 'some content',
      id: 1,
      votes: 0
    },
    {
      content: 'some more content',
      id: 2,
      votes: 0
    }
  ]

  test('upvote to increment vote by 1', () => {

    const state = initialState

    deepFreeze(state)

    const newState = anecdoteReducer(state, {
      type: 'UPVOTE',
      payload: 1
    })

    console.log('newState', newState)

    expect(newState[0].votes).toBe(1)
    expect(newState[1].votes).toBe(0)

  })

  test.only('add note', () => {
    const state = initialState

    deepFreeze(state)

    const newState = anecdoteReducer(state, { type: 'NEW_NOTE', payload: { content: 'a new anecdote' } })
    console.log('newState', newState)
    expect(newState).toHaveLength(3)
  })

})
