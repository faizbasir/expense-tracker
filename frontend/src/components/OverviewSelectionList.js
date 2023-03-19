import React, { useEffect, useState } from "react";
import { useHttpClient } from "../shared/util/hooks/http-hook";
import DropDownItem from "./DropDownItem";
import { HiChevronDoubleDown} from "react-icons/hi"

const OverviewSelectionList = (props) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const { isLoading, sendRequest, error, clearError } = useHttpClient();

  useEffect(() => {}, []);

  const dropDownHandler = (e) => {
    setOpenDropdown(!openDropdown);
    props.selectYear(e.target.outerText);
  };

  return (
    <React.Fragment>
      <div className="mb-6">
        <p>Expenses for:</p>
        <div
          className={`flex cursor-default bg-secondary w-fit px-4  ${
            openDropdown ? "rounded-t-lg" : "rounded-lg"
          }`}
          onClick={dropDownHandler}
        >
          {props.chosenYear}
        </div>
        {openDropdown && (
          <ul className="absolute z-50 cursor-default rounded-b-lg bg-white transition-all duration-500 ease-in">
            <DropDownItem text={"2023"} onClick={dropDownHandler} />
            <DropDownItem text={"2022"} onClick={dropDownHandler} />
          </ul>
        )}
      </div>
    </React.Fragment>
  );
};

export default OverviewSelectionList;
