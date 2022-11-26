import React from "react";
import "./Button.css";

const Button = (props) => {
  return (
    <button
      className={`button ${props.default && "button-default"} ${
        props.inverse && "button-inverse"
      } ${props.danger && "button-danger"}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
