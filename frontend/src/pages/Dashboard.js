import React, { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../shared/util/hooks/http-hook";
import { AuthContext } from "../shared/context/auth-context";
import UsersList from "../components/UsersList";

import "./Dashboard.css";

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const [users, setUsers] = useState();

  useEffect(() => {
    const showExistingUsers = async () => {
      if (auth.user.role === "admin") {
        try {
          const responseData = await sendRequest(
            "http://localhost:5000/api/users/all-users",
            "GET",
            null,
            { Authorization: "Bearer " + auth.token }
          );
          setUsers(responseData.users);
        } catch (error) {}
      }
    };
    showExistingUsers();
  }, []);

  const deleteUserHandler = async () => {
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/users/all-users",
        "GET",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      setUsers(responseData.users);
    } catch (error) {}
  };

  return (
    <React.Fragment>
      {!isLoading && users && (
        <div className="user-list">
          <h2>Users</h2>
          <UsersList users={users} onDeleteUser={deleteUserHandler} />
        </div>
      )}
      <div>this is the dashboard</div>
    </React.Fragment>
  );
};

export default Dashboard;
