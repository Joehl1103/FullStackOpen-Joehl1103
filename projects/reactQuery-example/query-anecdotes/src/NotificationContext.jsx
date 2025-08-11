import { useContext, useReducer, createContext } from 'react'

export const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NEW':
      return `you just created a new note with the following content: ${action.payload}`
    case 'UPVOTE':
      return `you just upvoted ${action.payload}`
    case 'SHORT':
      return `the note is too short. It should be at least 5 characters long`
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

export const useNotificationMessage = () => {
  const counterAndDispatch = useContext(NotificationContext)
  return counterAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const counterAndDispatch = useContext(NotificationContext)
  return counterAndDispatch[1]
}

export default NotificationContext
