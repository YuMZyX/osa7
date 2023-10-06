import { useParams } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const User = ({ users }) => {
  const id = useParams().id;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return null;
  }
  return (
    <div>
      <br />
      <h2>{user.name}</h2>
      <br />
      <h4>Added blogs:</h4>
      <ListGroup>
        {user.blogs.map((blog) => (
          <ListGroup.Item action variant="primary" key={blog.id}>
            {blog.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default User;
