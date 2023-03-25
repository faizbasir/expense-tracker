import React from "react";

const OverviewSelectionList = (props) => {
  const dropDownHandler = (e) => {
    props.selectYear(e.target.value);
  };

  return (
    <React.Fragment>
      <div className="mb-6 flex">
        <p>Cash Flow for:</p>
        <select
          name="year"
          id="year"
          value={props.chosenYear}
          onChange={dropDownHandler}
          className="ml-4 text-whitesmoke px-4 rounded-md bg-secondary"
        >
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>
    </React.Fragment>
  );
};

export default OverviewSelectionList;
