import { useEffect, useContext } from "react";
import blogService from "./services/blogsService.js";
import BlogDisplay from "./components/blog-components/BlogDisplay";
import LoginForm from "./components/LoginForm";
import NotificationDisplay from "./components/NotificationDisplay";
import Togglable from "./components/Togglable";
import "./styles/notifications.css";
import "./styles/blog.css";
import { useNotificationValue } from "./contexts/notificationContext"
import LoggedinUserContext, { useSetTimeoutForLogout } from "./contexts/loggedinUserContext";
import UserView from "./components/user/UserView.jsx";
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import User from './components/user/User.jsx'
import { useGetUsersQuery } from "./hooks/useUser.jsx";
import { useHandleLike } from "./hooks/useBlog.jsx";
import Blog from './components/blog-components/Blog.jsx'
import { LogoutButton, Label } from './styles/styledComponent.jsx'
import './styles/general.css'
import { Nav } from './styles/styledComponent.jsx'
import { AiOutlineMenu } from "react-icons/ai";

const App = () => {
  const [loggedinUser, loggedinUserDispatch] = useContext(LoggedinUserContext)
  const notification = useNotificationValue()

  const userResponse = useGetUsersQuery()

  const users = userResponse.data
  const match = useMatch('/users/:id')
  const user = match ? users.find(u => u._id === match.params.id) : null

  const handleLike = useHandleLike()
  const setTimeoutForLogout = useSetTimeoutForLogout()

  useEffect(() => {
    const userInStorage = window.localStorage.getItem("loggedinUser");
    // console.log('userInStorage',userInStorage)
    if (userInStorage) {
      const userToSet = JSON.parse(userInStorage);
      loggedinUserDispatch({ type: 'SET', payload: userToSet })
      setTimeoutForLogout()
      blogService.setToken(userToSet.token);
    }
  }, []);

  if (userResponse.isPending) {
    return <div>...loading user data</div>
  }

  const handleLogout = () => {
    if (window.confirm("Are you sure that you want to logout?")) {
      window.localStorage.clear();
      blogService.setToken(null);
      window.location.reload();
    }
  };
  // console.log('loggedinUser',loggedinUser)
  return (
    <div >
      {notification && (<NotificationDisplay />)}

      {!loggedinUser ? (
        <div className="container">
          < Togglable buttonLabel="show login form" cancelLabel="cancel">
            <LoginForm />
          </Togglable>
        </div>
      )

        :
        (
          <div>
            <Nav>
              <div className="navLinkIcon"><AiOutlineMenu /></div>
              <Link className="navLinkItem" to={'/'}>1. Blogs</Link> {' '}
              <Link className="navLinkItem" to={'/users'}>2. Users</Link> {' '}
              <div></div>
            </Nav>
            <div className="loginDiv">
              Logged in as <b>{loggedinUser.username}</b>{" "}
              <LogoutButton onClick={handleLogout}>logout</LogoutButton>
            </div>
            <hr />
            <Routes>
              <Route path={'/*'} element={<BlogDisplay user={loggedinUser} />} />
              <Route path={'/users/*'} element={<UserView />} />
              <Route path={`/users/:id`} element={<User user={user} />} />
              <Route path={`/:id`} element={<Blog />} />
            </Routes>
          </div>
        )
      }

    </div >
  );
};

export default App;
