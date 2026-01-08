import { setFilter } from "../reducers/filterReducer";
import { useDispatch } from 'react-redux'

const VisibilityFilter = (props) => {
  const dispatch = useDispatch()
  return (
    <>
      all <input type='radio' name='filter' onChange={() => dispatch(setFilter('ALL'))} />
      important <input type='radio' name='filter' onChange={() => dispatch(setFilter('IMPORTANT'))} />
      non-important <input type='radio' name='filter' onChange={() => dispatch(setFilter('NONIMPORTANT'))} />
    </>
  )
}

export default VisibilityFilter
