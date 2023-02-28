import React from "react";
import ExpenseItem from "./ExpenseItem";

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
      onDelete={props.onDeleteExpense}
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
      <h2 className="text-whitesmoke w-[70%] m-auto mb-8 p-4 text-2xl">
        Expenses
      </h2>

      <table className="bg-whitesmoke w-[70%] m-auto table-auto">
        <thead className="bg-secondary">
          <tr>
            <th className="p-2 text-left text-whitesmoke text-lg">Txn ID</th>
            <th className="p-2 text-left text-whitesmoke text-lg">Summary</th>
            <th className="p-2 text-left text-whitesmoke text-lg">Amount</th>
            <th className="p-2 text-left text-whitesmoke text-lg">Date</th>
            <th className="p-2 text-left text-whitesmoke text-lg">
              Description
            </th>
            <th></th>
          </tr>
        </thead>
        {tableData}
      </table>
    </React.Fragment>
  );
};

export default ExpenseList;
