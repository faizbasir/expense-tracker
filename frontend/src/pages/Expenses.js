import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExpenseList from "../components/ExpenseList";
import { AuthContext } from "../shared/context/auth-context";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import { useHttpClient } from "../shared/util/hooks/http-hook";

const Expenses = () => {
  const auth = useContext(AuthContext);
  const user = useParams().userId;
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [expenses, setExpenses] = useState();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:4000/api/expenses/user/${user}`,
          "GET",
          null,
          { Authorization: "Bearer " + auth.token }
        );
        setExpenses(responseData.expenses);
      } catch (error) {}
    };
    fetchExpenses();
  }, [sendRequest, auth.token, user]);

  // load new list of places
  const deleteHandler = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:4000/api/expenses/user/${user}`,
        "get",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      setExpenses(responseData.expenses);
    } catch (error) {}
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      {!isLoading && expenses && (
        <ExpenseList items={expenses} onDeleteExpense={deleteHandler} />
      )}
    </React.Fragment>
  );
};

export default Expenses;
