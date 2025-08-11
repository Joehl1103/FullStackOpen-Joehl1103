import { createContext, useReducer, useContext } from 'react'

const loggedinUserReducer = (state, action) => {
  switch (action.type) {
    case 'SET': {
      return action.payload
    }
  }
}

const LoggedinUserContext = createContext()

export const LoggedinUserContextProvider = (props) => {
  const [loggedinUser, loggedinUserDispatch] = useReducer(loggedinUserReducer, null)
  return (
    <LoggedinUserContext.Provider value={[loggedinUser, loggedinUserDispatch]}>
      {props.children}
    </LoggedinUserContext.Provider>
  )
}

export const useLoggedinUserValue = () => {
  const userAndDispatch = useContext(LoggedinUserContext)
  return userAndDispatch[0]
}

export const useLoggedinUserDispatch = () => {
  const userAndDispatch = useContext(LoggedinUserContext)
  return userAndDispatch[1]
}

export const useSetTimeoutForLogout = () => {
  const dispatch = useLoggedinUserDispatch()
  return () => {
      const checkUserSession = () => {
      setTimeout(() => {
      if (window.confirm('Do you want to stay logged in')){
        checkUserSession()
      } else {
        dispatch({ type: 'SET', payload: null })
        window.location.reload()
      }
      
    }, 1000 * 60 * 15)
  }}
}

export default LoggedinUserContext
