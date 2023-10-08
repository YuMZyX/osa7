import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const notification = useSelector(({ notification }) => {
    return notification;
  });

  if (!notification) {
    return;
  }

  const style = {
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <Alert>{notification}</Alert>
};

export default Notification;
