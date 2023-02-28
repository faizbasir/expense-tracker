import React from "react";

const errorButton = (props) => {
  return (
    <button
      className={` px-[2rem] py-[0.5rem] rounded-lg my-[0.5rem] font-semibold ${
        props.disabled
          ? "bg-grey text-whitesmoke cursor-not-allowed"
          : "bg-white text-primary hover:bg-primary hover:text-white"
      } `}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default errorButton;
