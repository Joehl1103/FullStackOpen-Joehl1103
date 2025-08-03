import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from 'react-redux'

const VisibilityFilter = (props) => {
  const dispatch = useDispatch()
  return (
    <>
      all <input type='radio' name='filter' onChange={() => filterSelected('ALL')} />
      important <input type='radio' name='filter' onChange={() => filterSelected('IMPORTANT')} />
      non-important <input type='radio' name='filter' onChange={() => filterSelected('NONIMPORTANT')} />
    </>
  )
}

export default VisibilityFilter
