import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, logout } from './reducers/userReducer'

const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => {
    console.log(state.login)
    if (state.login === null) {
      return null
    }
    return state.login
  })

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  /*
  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      dispatch(setNotification('Invalid username or password'))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }
  */

  const blogFormRef = useRef()
  //console.log(user)

  if (user === null || Object.keys(user).length === 0) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      {user.name} logged in <button onClick={() => dispatch(logout())}>Logout</button>
      <br />
      <br />
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <br />
      <BlogList
        user={user}
      />
    </div>
  )
}

export default App
