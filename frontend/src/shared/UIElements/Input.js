import React from "react";
import "./Input.css";

const Input = (props) => {
  const inputChangeHandler = () => {};

  const touchHandler = () => {};

  const element =
    props.element === "input" ? (
      <input
        type={props.type}
        id={props.id}
        onChange={inputChangeHandler}
        // value={""}
        onBlur={touchHandler}
      />
    ) : (
      <textarea
        type={props.type}
        rows={props.rows || 3}
        id={props.id}
        onChange={inputChangeHandler}
        // value={""}
        onBlur={touchHandler}
      />
    );

  return (
    <div className="form-control">
      <label htmlFor={props.id}>{props.label}</label>
      {element}
    </div>
  );
};

export default Input;
