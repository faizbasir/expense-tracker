import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../shared/context/auth-context";
import { useHttpClient } from "../shared/util/hooks/http-hook";
import UsersList from "../components/UsersList";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";

const Users = () => {
  const auth = useContext(AuthContext);
  const [users, setUsers] = useState();
  const { sendRequest, isLoading, error, clearError } = useHttpClient();

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
      console.log(responseData.users);
      setUsers(responseData.users);
    } catch (error) {}
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      {!isLoading && users && (
        <div>
          <UsersList users={users} onDeleteUser={deleteUserHandler} />
        </div>
      )}
    </React.Fragment>
  );
};

export default Users;
