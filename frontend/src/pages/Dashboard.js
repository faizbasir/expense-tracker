import React, { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../shared/util/hooks/http-hook";
import { AuthContext } from "../shared/context/auth-context";
import UserProfile from "../components/UserProfile";
import ExpenseGraph from "../components/ExpenseGraph";
import OverviewSelectionList from "../components/OverviewSelectionList";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import { HiChevronDoubleDown} from "react-icons/hi"

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
          `http://localhost:4000/api/expenses/overview/${auth.user.id}`,
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
      {isLoading && <LoadingSpinner />}
      {!isLoading && overview && (
        <div className="flex justify-start max-w-[90%] m-auto mb-12">
          <div className="text-white w-[25%] py-6">
            <UserProfile />
          </div>
          <div className="text-white w-[75%] px-8 py-6">
            <OverviewSelectionList
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
