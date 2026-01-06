import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'success': {
      return {
        type: 'success',
        message: `Success: ${action.message}`
      }
    }
    case 'error': {
      return {
        type: 'error',
        message: `Error: ${action.message}`
      }
    }
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    {
      type: null,
      message: null
    }
  )
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const useNotificationWithTimeout = () => {
  const dispatch = useNotificationDispatch()
  return (type, message) => {
    dispatch({ type: type, message: message })
    setTimeout(() => {
      dispatch({ type: null, message: null })
    }, 5000)
  }
}

export default NotificationContext
