import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import BlogDisplay from './components/blog-components/BlogDisplay'
import LoginForm from './components/LoginForm'
import NotificationDisplay from './components/NotificationDisplay'
import Togglable from './components/Togglable'
import './styles/notifications.css'
import './styles/blog.css'

const App = () => {
  const [user, setUser] = useState(null)
  const [notificationType,setNotificationType] = useState(null)
  const [notificationMessage,setNotificationMessage] = useState(null)

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser){
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }

  },[])

  const notificationSettingLogic=(type,message,timing)=>{
    setNotificationType(type)
    // console.log(`set type to ${type}`)
    setNotificationMessage(message)
    // console.log(`set message to ${message}`)
    setTimeout(()=>{
      setNotificationType(null)
      setNotificationMessage(null)
    },timing)
    console.log(`scheduled timout for ${timing}ms`)
  }

  const handleLogout = () =>{
    if(window.confirm("Are you sure that you want to logout?")){
      window.localStorage.clear()
      blogService.setToken(null)
      window.location.reload()
    }
  }

    return (
      <div>
          {notificationType && (
              <NotificationDisplay
                notificationType={notificationType}
                notificationMessage={notificationMessage}
              />
          )}
          
        {user === null ? 
        <Togglable buttonLabel='show login form' cancelLabel='cancel'>
           <LoginForm 
            user={user}
            setUser={setUser}
            notificationSettingLogic={notificationSettingLogic}
            /> 
        </Togglable>
            :
            <div>
              Logged in as <b>{user.username}</b>{' '}
              <button onClick={handleLogout}>logout</button>
              <BlogDisplay
                notificationSettingLogic={notificationSettingLogic}
                setNotificationType={setNotificationType}
                user={user}
              />
            </div>
            }
        </div>
    )
  }

  export default App