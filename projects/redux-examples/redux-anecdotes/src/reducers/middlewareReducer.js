const sort = (array) => {
  let n = array.length
  for (let i = 0; i < n - 1; i++) {
    let max_idx = i
    for (let j = i + 1; j < n; j++) {
      if (array[j].votes > array[max_idx].votes) {
        max_idx = j
      }
    }
    let temp = array[i]
    array[i] = array[max_idx]
    array[max_idx] = temp
  }
  console.log('array in sort', array)
  return array
}
const middlewareReducer = (state, action) => {
  switch (action.type) {
    case 'SORT': {
      const stateCopy = [...state]
      const sortedArray = sort(stateCopy)
      console.log('sorted array in reducer', sortedArray)
      return sortedArray
    }
  }
}

export default middlewareReducer
