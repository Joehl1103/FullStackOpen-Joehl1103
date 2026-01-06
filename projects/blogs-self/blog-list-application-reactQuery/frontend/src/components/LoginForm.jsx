import loginService from "../services/loginService";
import blogService from "../services/blogsService";
import { useState } from "react";
import PasswordInput from "./PasswordInput";
import { useNotificationWithTimeout } from "../contexts/notificationContext"
import { useLoggedinUserDispatch } from "../contexts/loggedinUserContext";
import { Button, Input, Label } from '../styles/styledComponent.jsx'
import '../styles/general.css'

const LoginForm = () => {
  const userDispatch = useLoggedinUserDispatch()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatchWithTimeout = useNotificationWithTimeout()

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedinUser", JSON.stringify(user));
      blogService.setToken(user.token);
      console.log(`Token set to: Bearer ${user.token}`);
      userDispatch({ type: 'SET', payload: user })
      setUsername("");
      setPassword("");
    } catch (e) {
      console.log(`Error ${e.message}`);
      console.log(e);
      dispatchWithTimeout("error", "wrong username or password")
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="inputDiv">
          <Label>Username:{" "}</Label>
          <Input
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="inputDiv">
          <PasswordInput
            data-testid="password"
            password={password}
            setPassword={setPassword}
          />
        </div>
        <Button type="submit" data-testid="login-button">
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
