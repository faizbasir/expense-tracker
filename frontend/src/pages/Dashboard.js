import React, { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../shared/util/hooks/http-hook";
import { AuthContext } from "../shared/context/auth-context";
import UserProfile from "../components/UserProfile";
import ExpenseGraph from "../components/ExpenseGraph";
import DropDownList from "../components/DropDownList";

const DUMMY_EXPENSES = [
  {
    id: "1",
    amount: "234",
    date: "2023-01-03",
    summary: "test transaction 1",
    description: "test transaction 1",
  },
  {
    id: "2",
    amount: "24",
    date: "2023-01-10",
    summary: "test transaction 2",
    description: "test transaction 2",
  },
  {
    id: "3",
    amount: "500",
    date: "2023-01-15",
    summary: "test transaction 3",
    description: "test transaction 3",
  },
  {
    id: "4",
    amount: "1000",
    date: "2023-02-03",
    summary: "test transaction 4",
    description: "test transaction 4",
  },
  {
    id: "5",
    amount: "300",
    date: "2023-02-10",
    summary: "test transaction 5",
    description: "test transaction 5",
  },
  {
    id: "6",
    amount: "800",
    date: "2023-02-15",
    summary: "test transaction 6",
    description: "test transaction 6",
  },
  {
    id: "7",
    amount: "234",
    date: "2022-01-03",
    summary: "test transaction 7",
    description: "test transaction 7",
  },
  {
    id: "8",
    amount: "400",
    date: "2022-01-10",
    summary: "test transaction 8",
    description: "test transaction 8",
  },
  {
    id: "9",
    amount: "500",
    date: "2022-01-15",
    summary: "test transaction 9",
    description: "test transaction 9",
  },
];

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const [overview, setOverview] = useState();
  const [overviewYear, setOverviewYear] = useState(
    String(new Date().getFullYear())
  );

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/expenses/overview/${auth.user.id}`,
          "POST",
          JSON.stringify({
            year: overviewYear,
          }),
          {
            Authorization: "Bearer " + auth.token,
            "Content-Type": "application/json",
          }
        );
        setOverview(responseData);
      } catch (error) {}
    };
    fetchOverview();
  }, [sendRequest, auth.token, auth.id, overviewYear]);

  return (
    <React.Fragment>
      {!isLoading && overview && (
        <div className="flex justify-start max-w-[90%] m-auto mb-12">
          <div className="text-white w-[25%] py-6">
            <UserProfile />
          </div>
          <div className="text-white w-[75%] px-8 py-6">
            <DropDownList
              selectYear={setOverviewYear}
              chosenYear={overviewYear}
            />
            <ExpenseGraph data={overview} />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Dashboard;
