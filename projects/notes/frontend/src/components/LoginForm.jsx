import { useState } from 'react'
import PropTypes from 'prop-types'
import PasswordInput from './PasswordInput'

const LoginForm = ({ loginUser }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        loginUser(username,password)
        setUsername('')
        setPassword('')
    }

    return (
        <form onSubmit={handleLogin}>
            <div>
                <label>username:{' '}</label>
                <input
                    data-testid="username"
                    type="text"
                    value={username}
                    name="Username"
                    placeholder='username'
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                <PasswordInput
                    data-testid="password"
                    password={password}
                    setPassword={setPassword}/>
            </div>
            <button type="submit">login</button>
        </form>
    )
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm