import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import usersService from './services/users'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, logout } from './reducers/userReducer'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import {
  Routes,
  Route,
  Link,
} from "react-router-dom"
import { Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap'

const App = () => {

  const [users, setUsers] = useState([])

  const dispatch = useDispatch()
  const user = useSelector(state => {
    if (state.login === null) {
      return null
    }
    return state.login
  })
  const blogs = useSelector(state => state.blogs)

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

  useEffect(() => {
    usersService.getAll().then(users => {
      setUsers(users)
    })
  }, [])

  const padding = {
    padding: 5
  }
  const style = {
    backgroundColor: "lightgrey"
  }

  if (user === null || Object.keys(user).length === 0) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div className='container'>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="primary">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link class="fs-5" style={padding} to='/'>Blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link class="fs-5" style={padding} to='/users'>Users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <span class="text-end">{user.name} logged in </span>
              <Button class="btn btn-outline-primary btn-sm" onClick={() => dispatch(logout())}>Logout</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Notification />

      <Routes>
        <Route path='/' element={<Home user={user} />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User users={users} />} />
        <Route path="/blogs/:id" element={<Blog blogs={blogs} />} />
      </Routes>
      <br />
    </div>
  )
}

const Home = ({user}) => {
  const blogFormRef = useRef()

  return (
    <div>
      <h2>Blogs</h2>
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
