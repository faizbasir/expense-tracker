import React from "react";

const Button = (props) => {
  return (
    <button
      className={` px-[2rem] py-[0.5rem] rounded-lg mr-[0.5rem] my-[0.5rem] font-semibold 
      ${
        props.disabled
          ? "bg-grey text-whitesmoke cursor-not-allowed"
          : "bg-secondary text-white hover:bg-whitesmoke hover:text-secondary"
      }`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
