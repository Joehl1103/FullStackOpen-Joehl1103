
const reducer = (state = [], action) => {
  console.log('state in filter reducer', state)
  switch (action.type) {
    case 'FILTER':
      console.log('payload content in filterReducer', action.payload)
      return action.payload
    default:
      return state
  }
}

export const filterState = (content) => {
  // console.log('content in filterState', content)
  return {
    type: 'FILTER',
    payload: content
  }
}

export default reducer
