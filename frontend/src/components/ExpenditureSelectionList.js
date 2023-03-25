import React, { useState } from "react";

const OverviewSelectionList = (props) => {
  const clickHandler = (e) => {
    props.selectType(e.target.value);
  };

  return (
    <>
      <select
        name="txn"
        id="txn"
        value={props.type}
        onChange={clickHandler}
        className="ml-4 text-whitesmoke px-4 bg-secondary rounded-xl"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
    </>
  );
};

export default OverviewSelectionList;
