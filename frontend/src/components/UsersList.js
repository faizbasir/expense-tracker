import React from "react";
import UserItem from "./UserItem";
import "./UsersList.css";

const UsersList = (props) => {
  console.log(props.users);
  const data = props.users.map((user) => (
    <UserItem
      key={user.id}
      id={user.id}
      name={user.name}
      email={user.email}
      role={user.role}
    />
  ));

  return (
    <React.Fragment>
      <div className="list">{data}</div>
    </React.Fragment>
  );
};
export default UsersList;
