import loginService from '../services/login'
import blogService from '../services/blogs'
import { useState } from 'react'
import PasswordInput from './PasswordInput'
import userService from '../services/users'

const LoginForm = (props) => {

    const {setUser,notificationSettingLogic } = props
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // function getUserIdWithUsername(userArray,username){
    //   let userId
    //   userArray.forEach(userObject => {
    //     console.log('user inside forEach loop',userObject)
    //     if(userObject.username === username){
    //       console.log('username match',userObject)
    //       console.log('id',userObject._id.toString())
    //       userId = userObject._id.toString()
    //     }
    //   })
    //   return userId
    // }

    const handleLogin = async (event) => {
        event.preventDefault()

        const users = await userService.getUsers()
        // const userId = getUserIdWithUsername(users,username)
    
        try {
          const user = await loginService.login({
            username, password
          })
    
          window.localStorage.setItem('loggedInUser',JSON.stringify(user))
          blogService.setToken(user.token)
          console.log(`Token set to: Bearer ${user.token}`)
          setUser(user)
          setUsername('')
          setPassword('')
        } catch (e) {
          console.log(`Error ${e.message}`)
          console.log(e)
          notificationSettingLogic('badLogin','wrong username or password',5000)
        }
         
      }

    return (
        <form onSubmit={handleLogin}>
          <div>
            username: {' '}
            <input 
              data-testid="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}/>
          </div>
          <div>
          <PasswordInput
                    data-testid="password"
                    password={password}
                    setPassword={setPassword}/>
          </div>
          <button type="submit" data-testid="login-button">login</button>
        </form>
      )
}

export default LoginForm