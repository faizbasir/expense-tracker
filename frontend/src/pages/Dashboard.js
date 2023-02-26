import React, { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../shared/util/hooks/http-hook";
import { AuthContext } from "../shared/context/auth-context";
import UsersList from "../components/UsersList";

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
        <div>
          <h2 className="text-whitesmoke m-auto max-w-[50%] text-2xl mb-6">
            Users
          </h2>
          <UsersList users={users} onDeleteUser={deleteUserHandler} />
        </div>
      )}
      <div>this is the dashboard</div>
    </React.Fragment>
  );
};

export default Dashboard;
