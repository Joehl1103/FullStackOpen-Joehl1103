import { useReducer, createContext } from 'react'

export const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NEW':
      return `you just created a new note with the following content: ${action.payload}`
    case 'UPVOTE':
      return `you just upvoted ${action.payload}`
    case 'NONE':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notificationMessage, notificationDispatch] = useReducer(notificationReducer, '')
  return (
    <NotificationContext.Provider value={[notificationMessage, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
