import Button from "../shared/UIElements/Button";
import "./UserItem.css";

const UserItem = (props) => {
  return (
    <div className="user-item">
      <div className="item-content">
        <h4>UID: {props.id}</h4>
        <h4>Name: {props.name}</h4>
        <h4>Email: {props.email}</h4>
        <h4>Role: {props.role}</h4>
      </div>
      <div className="action">
        <Button danger>Delete</Button>
      </div>
    </div>
  );
};
export default UserItem;
