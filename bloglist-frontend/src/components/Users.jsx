import { Link } from "react-router-dom"

const Users = ({ users }) => {

    if (users.length === 0) {return null}

    return (
      <div>
        <h2>Users</h2>
        <table>
          <tbody>
            <tr>
              <td><b>Name</b></td>
              <td><b>Blogs created</b></td>
            </tr>
            {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    )
}

export default Users