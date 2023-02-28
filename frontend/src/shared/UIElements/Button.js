import React from "react";

const Button = (props) => {
  return (
    <button
      className={` px-[2rem] py-[0.5rem] rounded-lg my-[0.5rem] font-semibold ${
        props.disabled
          ? "bg-grey text-whitesmoke cursor-not-allowed"
          : "bg-secondary text-white hover:bg-whitesmoke hover:text-secondary"
      } ${
        props.modalButton
          ? "bg-white text-primary hover:bg-primary hover:text-white"
          : ""
      } ${
        props.danger
          ? "bg-red text-whitesmoke hover:bg-whitesmoke hover:text-primary"
          : ""
      }`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
