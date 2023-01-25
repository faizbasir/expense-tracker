import React, { useCallback, useReducer, useState } from "react";
import Button from "../shared/UIElements/Button";
import Input from "../shared/UIElements/Input";
import {
  VALIDATOR_REQUIRED,
  VALIDATOR_MINLENGTH,
} from "../shared/util/Validator";
import { formReducer } from "../shared/Reducers/FormReducer";

import "./NewExpense.css";
import { useForm } from "../shared/util/hooks/form-hook";

const NewExpense = () => {
  const [formState, inputHandler] = useForm(
    {
      summary: { value: "", isValid: false },
      amount: { value: 0, isValid: false },
      date: { value: "", isValid: false },
      description: { value: "", isValid: false },
    },
    false
  );

  const submitFormHandler = (e) => {
    e.preventDefault();
    console.log(formState);
    try {
    } catch (error) {}
  };

  return (
    <form className="new-expense-form" onSubmit={submitFormHandler}>
      <Input
        element="input"
        id="summary"
        label="Transaction Summary"
        type="text"
        errorText="Please input a transaction summary"
        onInput={inputHandler}
        validators={[VALIDATOR_REQUIRED()]}
      />
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
      <Input
        id="description"
        label="Description"
        type="text"
        errorText="Please input a short description"
        onInput={inputHandler}
        validators={[VALIDATOR_MINLENGTH(5)]}
      />
      <Button type="submit" default disabled={!formState.isValid}>
        Submit Transaction
      </Button>
    </form>
  );
};

export default NewExpense;
