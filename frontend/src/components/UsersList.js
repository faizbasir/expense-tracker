import React from "react";
import UserItem from "./UserItem";

const UsersList = (props) => {
  const data = props.users.map((user) => (
    <UserItem
      key={user.id}
      id={user.id}
      name={user.name}
      email={user.email}
      active={user.active}
      role={user.role}
      onDelete={props.onDeleteUser}
      onReload={props.onReload}
    />
  ));

  return (
    <div className="max-w-[60%] m-auto">
      <table className="table-auto min-w-full">
        <thead className="bg-secondary">
          <tr>
            <th className="text-white pl-4 text-left p-1 border-none rounded-tl-lg">
              UID
            </th>
            <th className="text-white pl-4 text-left p-1">Name</th>
            <th className="text-white pl-4 text-left p-1">Email</th>
            <th className="text-white pl-4 text-left p-1">Role</th>
            <th className="text-white pl-4 text-left p-1">Active</th>
            <th></th>
            <th className="border-none rounded-tr-lg"></th>
          </tr>
        </thead>
        {data}
      </table>
    </div>
  );
};
export default UsersList;
