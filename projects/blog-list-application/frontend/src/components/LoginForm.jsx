import loginService from '../services/login'
import blogService from '../services/blogs'
import { useState } from 'react'

const LoginForm = (props) => {

    const {setUser,notificationSettingLogic } = props
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('handling login')
        console.log(`username: ${username} || password: ${password}`)
    
        try {
          const user = await loginService.login({
            username, password,
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
            password: {' '}
            <input
              data-testid="password"
              type="password"
              value={password}
              name="password"
              onChange={({ target }) => {
                console.log(`target.value ${target.value}`)
                setPassword(target.value)}}
            />
          </div>
          <button type="submit" data-testid="login-button">login</button>
        </form>
      )
}

export default LoginForm