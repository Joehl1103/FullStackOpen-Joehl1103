import { createContext, useReducer } from 'react'

const blogsReducer = (state, action) => {
  switch (action.type) {
    case 'SET': {
      return action.payload
    }
    default:
      return state
  }
}

const BlogContext = createContext()

export const BlogContextProvider = (props) => {
  const [blogs, blogsDispatch] = useReducer(blogsReducer, [])
  return (
    <BlogContext.Provider value={[blogs, blogsDispatch]}>
      {props.children}
    </BlogContext.Provider>
  )
}

export default BlogContext
