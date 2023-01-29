import React, { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../shared/util/hooks/http-hook";
import { useParams } from "react-router-dom";
import { AuthContext } from "../shared/context/auth-context";
import UsersList from "../components/UsersList";

import "./Dashboard.css";

const Dashboard = () => {
  const userId = useParams().userId;
  const auth = useContext(AuthContext);
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const [users, setUsers] = useState();

  useEffect(() => {
    const showExistingUsers = async () => {
      if (auth.user.role === "admin") {
        try {
          const responseData = await sendRequest(
            "http://localhost:5000/api/users/all-users"
          );
          console.log(responseData.users);
          setUsers(responseData.users);
        } catch (error) {}
      }
    };
    showExistingUsers();
  }, []);

  return (
    <React.Fragment>
      {!isLoading && users && (
        <div className="user-list">
          <h2>Users</h2>
          <UsersList users={users} />
        </div>
      )}
      <div>this is the dashboard</div>
    </React.Fragment>
  );
};

export default Dashboard;
