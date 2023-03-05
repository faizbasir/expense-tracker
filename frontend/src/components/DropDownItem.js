import React from "react";

const DropDownItem = (props) => {
  return (
    <li
      className="px-4 text-tertiary hover:bg-grey hover:text-primary last:rounded-b-lg"
      onClick={props.onClick}
    >
      {props.text}
    </li>
  );
};

export default DropDownItem;
