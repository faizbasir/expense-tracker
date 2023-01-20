import React from "react";
import { useHttpClient } from "../shared/util/hooks/http-hook";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const userId = useParams().userId;
  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  const showExistingUsers = async () => {
    const responseData = await sendRequest(
      "http://localhost:5000/api/users/all-users"
    );
    console.log(responseData);
  };
  return (
    <React.Fragment>
      <div>this is the dashboard</div>
      <button onClick={showExistingUsers}>Click here</button>
    </React.Fragment>
  );
};

export default Dashboard;
