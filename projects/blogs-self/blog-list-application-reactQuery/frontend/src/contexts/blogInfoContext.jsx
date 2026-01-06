import { createContext, useReducer, useContext } from 'react'

const blogInfoReducer = (state, action) => {
    switch(action.type) {
        case 'SET-TITLE': {
            return {...state, title: action.payload}
        }
        case 'SET-AUTHOR': {
            return {...state, author: action.payload}
        }
        case 'SET-URL': {
            return {...state, url: action.payload}
        }
        case 'SET-ALL': {
            console.log('setting state to',action.payload)
            return {...action.payload}
        }
    }
}

const BlogInfoContext = createContext()

export const BlogInfoContextProvider = (props) => {
    const [blogInfo,blogInfoDispatch] = useReducer(blogInfoReducer, {title: '', author: '', url: ''})
    return (
        <BlogInfoContext.Provider value={[blogInfo,blogInfoDispatch]}>
            {props.children}
        </BlogInfoContext.Provider>
    )
}

export const useBlogInfoDispatch = () => {
    const blogInfoAndDispatch = useContext(BlogInfoContext)
    return blogInfoAndDispatch[1]
}

export const useResetBlogInfoState = () => {
    const dispatch = useBlogInfoDispatch()
    return () => {
        dispatch({ type: 'SET-ALL', payload: { title: '', author: '', url: ''}})
    }
}

export default BlogInfoContext