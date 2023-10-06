import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const Users = ({ users }) => {
  if (users.length === 0) {
    return null;
  }

  return (
    <div>
      <br />
      <h2>Users</h2>
      <br />
      <Table striped bordered hover variant="light">
        <tbody>
          <tr>
            <td>
              <b>Name</b>
            </td>
            <td>
              <b>Blogs created</b>
            </td>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
