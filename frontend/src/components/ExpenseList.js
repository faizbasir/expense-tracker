import React from "react";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = (props) => {
  const tableData = props.items.map((item) => (
    <ExpenseItem
      key={item.id}
      id={item.id}
      summary={item.summary}
      amount={item.amount}
      date={item.date}
      description={item.description}
      type={item.type}
      onDelete={props.onDeleteExpense}
    />
  ));

  if (props.items.length === 0) {
    return (
      <div className="w-fit m-auto text-white text-3xl">
        <h2>There are no transactions yet</h2>
      </div>
    );
  }

  return (
    <React.Fragment>
      <table className="bg-whitesmoke w-[70%] m-auto table-auto ">
        <thead className="bg-secondary">
          <tr>
            <th className="p-2 text-left text-whitesmoke text-lg">Txn ID</th>
            <th className="p-2 text-left text-whitesmoke text-lg">Summary</th>
            <th className="p-2 text-left text-whitesmoke text-lg">Amount</th>
            <th className="p-2 text-left text-whitesmoke text-lg">Date</th>
            <th className="p-2 text-left text-whitesmoke text-lg">Type</th>
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
