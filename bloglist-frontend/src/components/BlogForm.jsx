import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Form, Button } from "react-bootstrap";

const BlogForm = () => {
  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;
    const blog = {
      title: title,
      author: author,
      url: url,
    };
    dispatch(createBlog(blog));
    dispatch(setNotification(`A new blog: ${title} was added`));
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("url").value = "";
  };

  return (
    <div>
      <h3>Create a new blog</h3>
      <Form onSubmit={addBlog} className="m-1">
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control type="text" name="title" id="title"></Form.Control>
          <Form.Label>Author:</Form.Label>
          <Form.Control type="text" name="author" id="author"></Form.Control>
          <Form.Label>Url:</Form.Label>
          <Form.Control type="text" name="url" id="url"></Form.Control>
          <br />
          <Button variant="primary" size="sm" type="submit">
            Create
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default BlogForm;
