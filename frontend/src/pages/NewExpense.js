import Button from "../shared/UIElements/Button";
import Input from "../shared/UIElements/Input";
import {
  VALIDATOR_REQUIRED,
  VALIDATOR_MINLENGTH,
} from "../shared/util/Validator";
import { AuthContext } from "../shared/context/auth-context";

import { useForm } from "../shared/util/hooks/form-hook";
import { useHttpClient } from "../shared/util/hooks/http-hook";
import React, { useContext, useState } from "react";
import ErrorModal from "../shared/UIElements/ErrorModal";
import ExpenditureSelectionList from "../components/ExpenditureSelectionList"
import { Navigate, useNavigate } from "react-router-dom";

const NewExpense = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [type, setType] = useState("Expense")
  const [formState, inputHandler] = useForm(
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
      const responseData = await sendRequest(
        "http://localhost:4000/api/expenses/new-expense",
        "POST",
        JSON.stringify({
          summary: formState.inputs.summary.value,
          amount: formState.inputs.amount.value,
          date: formState.inputs.date.value,
          description: formState.inputs.description.value,
          creator: auth.user.id,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      navigate(`/${auth.user.id}/expenses`);
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onCancel={clearError} />
      <form
        className="max-w-[40%] m-auto text-white"
        onSubmit={submitFormHandler}
      >
        <div>
          <p>Type:</p>
          <ExpenditureSelectionList type={type} selectType={setType} />
        </div>
        <Input
          element="input"
          id="summary"
          label="Transaction Summary"
          type="text"
          errorText="Please input a transaction summary"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRED()]}
        />
        <div className="flex justify-between">
          <Input
            element="input"
            id="amount"
            label="Transaction Amount"
            type="number"
            errorText="Please input a transaction amount"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRED()]}
          />
          <Input
            element="input"
            id="date"
            label="Transaction Date"
            type="date"
            errorText="Please input a transaction date"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRED()]}
            />
          </div>
        <Input
          id="description"
          label="Description"
          type="text"
          errorText="Please input a short description"
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(5)]}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Submit Transaction
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewExpense;
