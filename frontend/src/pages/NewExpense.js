import React from "react";
import Button from "../shared/UIElements/Button";
import Input from "../shared/UIElements/Input";

import "./NewExpense.css";

const submitFormHandler = (e) => {
  e.preventDefault();
  console.log();
};

const NewExpense = () => {
  return (
    <form className="new-expense-form" onSubmit={submitFormHandler}>
      <Input
        element="input"
        id="summary"
        label="Transaction Summary"
        type="text"
        errorText="Please input a transaction summary"
      />
      <Input
        element="input"
        id="amount"
        label="Transaction Amount"
        type="number"
        errorText="Please input a transaction amount"
      />
      <Input
        element="input"
        id="date"
        label="Transaction Date"
        type="date"
        errorText="Please input a transaction date"
      />
      <Input
        id="description"
        label="Description"
        type="text"
        errorText="Please input a short description"
      />
      <Button default>Submit Transaction</Button>
    </form>
  );
};

export default NewExpense;
