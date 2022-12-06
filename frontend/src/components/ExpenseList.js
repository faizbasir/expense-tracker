import React from "react";
import ExpenseItem from "./ExpenseItem";
import "./ExpenseList.css";

const ExpenseList = (props) => {
  console.log(props);
  console.log(props.items.length);

  const tableData = props.items.map((item) => (
    <ExpenseItem
      key={item.id}
      id={item.id}
      summary={item.summary}
      amount={item.amount}
      date={item.date}
      description={item.description}
    />
  ));

  if (props.items.length === 0) {
    return (
      <div className="expense-list center">
        <h2>There are no transactions yet</h2>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="transaction-title">
        <h2>Transactions</h2>
      </div>

      <table>
        <tr>
          <th>Summary</th>
          <th>Amount</th>
          <th>Description</th>
          <th>Date</th>
        </tr>
        {tableData}
      </table>

      {/* <ul className="expense-list">
        {props.items.map((item) => (
          <ExpenseItem
            key={item.id}
            id={item.id}
            summary={item.summary}
            amount={item.amount}
            description={item.description}
          />
        ))}
      </ul> */}
    </React.Fragment>
  );
};

export default ExpenseList;
