import React, { useContext, useEffect, useState } from "react";
import Input from "../shared/UIElements/Input";
import Button from "../shared/UIElements/Button";
import {
  VALIDATOR_REQUIRED,
  VALIDATOR_MINLENGTH,
} from "../shared/util/Validator";
import { useForm } from "../shared/util/hooks/form-hook";
import { useNavigate, useParams } from "react-router-dom";
import { useHttpClient } from "../shared/util/hooks/http-hook";
import { AuthContext } from "../shared/context/auth-context";

const EditExpense = (props) => {
  const expenseId = useParams().expenseId;
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [expense, setExpense] = useState();
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      summary: { value: "", isValid: false },
      amount: { value: 0, isValid: false },
      date: { value: "", isValid: false },
      description: { value: "", isValid: false },
    },
    false
  );
  const submitFormHandler = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(
        `http://localhost:4000/api/expenses/${expenseId}`,
        "PATCH",
        JSON.stringify({
          summary: formState.inputs.summary.value,
          amount: formState.inputs.amount.value,
          date: formState.inputs.date.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (error) {}
    navigate(`/${auth.user.id}/expenses`);
  };

  const cancelUpdateHandler = () => {
    navigate(`/${auth.user.id}/expenses`);
  };

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:4000/api/expenses/${expenseId}`,
          "GET",
          null,
          { Authorization: "Bearer " + auth.token }
        );
        setExpense(responseData.expense);
        setFormData(
          {
            summary: { value: responseData.expense.summary, isValid: true },
            amount: { value: responseData.expense.amount, isValid: true },
            date: { value: responseData.expense.date, isValid: true },
            description: {
              value: responseData.expense.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    };
    fetchExpense();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {!isLoading && expense && (
        <form
          className="max-w-[40%] m-auto text-white"
          onSubmit={submitFormHandler}
        >
          <Input
            element="input"
            id="summary"
            label="Transaction Summary"
            type="text"
            errorText="Please input a transaction summary"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRED()]}
            value={formState.inputs.summary.value}
          />
          <Input
            element="input"
            id="amount"
            label="Transaction Amount"
            type="number"
            errorText="Please input a transaction amount"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRED()]}
            value={formState.inputs.amount.value}
          />
          <Input
            element="input"
            id="date"
            label="Transaction Date"
            type="date"
            errorText="Please input a transaction date"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRED()]}
            value={formState.inputs.date.value}
          />
          <Input
            id="description"
            label="Description"
            type="text"
            errorText="Please input a short description"
            onInput={inputHandler}
            validators={[VALIDATOR_MINLENGTH(5)]}
            value={formState.inputs.description.value}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Submit Transaction
          </Button>
          <Button onClick={cancelUpdateHandler}>Cancel</Button>
        </form>
      )}
    </React.Fragment>
  );
};
export default EditExpense;
