import deepFreeze from 'deep-freeze'
import sort from './middlewareReducer.test.js'
import middlewareReducer from './middlewareReducer.js'

describe('testing middleware functions', () => {
  test('testing sorting', () => {
    const anecdotes = [
      {
        content: 'some content',
        id: 1,
        votes: 1
      },
      {
        content: 'some more content',
        id: 2,
        votes: 2
      },
      {
        content: 'even more content',
        id: 3,
        votes: 3
      }
    ]

    const anecdotesCopy = [...anecdotes]

    deepFreeze(anecdotes)

    const sortedArray = middlewareReducer(anecdotesCopy, { type: 'SORT' })

    console.log('sorted array in test', sortedArray)
    console.log('1st item', sortedArray[0])
    console.log('1st item votes', sortedArray[0].votes)
    expect(sortedArray[0].votes).toBe(3)
    expect(sortedArray[1].votes).toBe(2)
    expect(sortedArray[2].votes).toBe(1)
  })
})
