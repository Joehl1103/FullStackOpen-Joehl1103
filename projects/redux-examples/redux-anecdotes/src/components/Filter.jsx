import { useDispatch, useSelector } from 'react-redux'
import { filterState } from '../reducers/filterReducer.js'

const Filter = () => {
  const dispatch = useDispatch()

  const handleFilter = (value) => {
    // console.log('value in handleFilter', value)
    dispatch(filterState(value))
  }

  return (
    <>
      Filter:
      <input
        type="text"
        onChange={event => handleFilter(event.target.value)} />
    </>
  )
}

export default Filter
