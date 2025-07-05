import loginService from '../services/login'
import noteService from '../services/noteService'

const LoginForm = ({ 
  setUser,
  setErrorMessage, 
  username,
  password,
  setUsername,
  setPassword,
  handleUsernameChange,
  handlePasswordChange
}) => {


    const handleLogin = async (event) => {
        event.preventDefault()
        // console.log('logging in with',username,password)
        try{
          const user = await loginService.login({
            username,password,
          })
          console.log('logged in with user',user)
          window.localStorage.setItem(
            'loggedNoteAppUser',JSON.stringify(user)
          )
          noteService.setToken(user.token)
          console.log(`token set to ${user.token}`)
          setUser(user)
          setUsername('')
          setPassword('')
        } catch (e){
          console.log(`Error: ${e.message}`)
          setErrorMessage('Wrong credentials')
          setTimeout(() => {
            setErrorMessage(null)
          },5000)
        }
      }
    
        return (
          <form onSubmit={handleLogin}>
            <div>
              username:{' '}
              <input
                type="text"
                value={username}
                name="Username"
                onChange={handleUsernameChange}
              />
            </div>
            <div>
              password:{' '}
              <input
                type="password"
                value={password}
                name="Password"
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit">login</button>
          </form>
    )
}

export default LoginForm