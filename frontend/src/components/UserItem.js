import Button from "../shared/UIElements/Button";
import { useHttpClient } from "../shared/util/hooks/http-hook";
import "./UserItem.css";

const UserItem = (props) => {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();

  const deleteUserHandler = async () => {
    await sendRequest(`http://localhost:5000/api/users/${props.id}`, "DELETE");
    props.onDelete();
  };

  return (
    <div className="user-item">
      <div className="item-content">
        <h4>UID: {props.id}</h4>
        <h4>Name: {props.name}</h4>
        <h4>Email: {props.email}</h4>
        <h4>Role: {props.role}</h4>
      </div>
      <div className="action">
        <Button danger onClick={deleteUserHandler}>
          Delete
        </Button>
      </div>
    </div>
  );
};
export default UserItem;
