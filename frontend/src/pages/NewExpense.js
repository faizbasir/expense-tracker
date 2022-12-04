import React, { useCallback, useReducer, useState } from "react";
import Button from "../shared/UIElements/Button";
import Input from "../shared/UIElements/Input";
import {
  VALIDATOR_REQUIRED,
  VALIDATOR_MINLENGTH,
} from "../shared/util/Validator";

import "./NewExpense.css";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const id in state.inputs) {
        if (id === action.id) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[id].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.id]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const NewExpense = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      summary: { value: "", isValid: false },
      amount: { value: 0, isValid: false },
      date: { value: "", isValid: false },
      description: { value: "", isValid: false },
    },
    isValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value,
      id,
      isValid,
    });
  }, []);

  const submitFormHandler = (e) => {
    e.preventDefault();
    console.log(formState);
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
