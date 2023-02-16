import React, { useCallback } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ExpenseList from "../components/ExpenseList";
import { AuthContext } from "../shared/context/auth-context";
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
          `http://localhost:5000/api/expenses/user/${user}`,
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
        `http://localhost:5000/api/expenses/user/${user}`
      );
      setExpenses(responseData.expenses);
    } catch (error) {}
  };

  return (
    <React.Fragment>
      {!isLoading && expenses && (
        <ExpenseList items={expenses} onDeleteExpense={deleteHandler} />
      )}
    </React.Fragment>
  );
};

export default Expenses;
