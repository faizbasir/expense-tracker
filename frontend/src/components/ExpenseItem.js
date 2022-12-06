import React from "react";
import Button from "../shared/UIElements/Button";
import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  return (
    <tr>
      <td>{props.summary}</td>
      <td>${props.amount}</td>
      <td>{props.description}</td>
      <td>{props.date}</td>
      <div className="action">
        <Button default>Edit</Button>
        <Button danger>Delete</Button>
      </div>
    </tr>
  );
};

export default ExpenseItem;
