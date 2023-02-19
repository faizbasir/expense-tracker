import React from "react";
// import "./Button.css";

const Button = (props) => {
  return (
    <button
      className={` px-[2rem] py-[0.5rem] rounded-lg my-[0.5rem] font-semibold ${
        props.disabled
          ? "bg-grey text-whitesmoke cursor-not-allowed"
          : "bg-secondary text-white hover:bg-whitesmoke hover:text-secondary"
      } `}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
