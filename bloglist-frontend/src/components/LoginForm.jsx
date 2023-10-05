import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import {
  useNavigate
} from "react-router-dom"
import { Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    dispatch(login(username, password))
    navigate('/')
  }

  return (
    <div className='container'>
      <h2>Log in to application</h2>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" name="username" id="username" />
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" name="password" id="password" />
          <br />
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm