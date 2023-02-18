import Button from "../shared/UIElements/Button";
import { useHttpClient } from "../shared/util/hooks/http-hook";
import "./UserItem.css";
import { AuthContext } from "../shared/context/auth-context";
import { useContext } from "react";

const UserItem = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest, error, clearError } = useHttpClient();

  const deleteUserHandler = async () => {
    await sendRequest(
      `http://localhost:5000/api/users/${props.id}`,
      "DELETE",
      null,
      { Authorization: "Bearer " + auth.token }
    );
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
