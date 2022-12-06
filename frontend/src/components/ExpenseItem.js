import React from "react";
import Button from "../shared/UIElements/Button";
import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.summary}</td>
        <td className="td-amount">${props.amount}</td>
        <td>{props.date}</td>
        <td>{props.description}</td>
        <td>
          <div className="action">
            <Button default>Edit</Button>
            <Button danger>Delete</Button>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default ExpenseItem;
