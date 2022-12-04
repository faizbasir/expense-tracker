import React, { useEffect, useReducer, useState } from "react";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, value: action.value, isValid: action.isValid };
    case "TOUCHED":
      return { ...state, isTouched: true };
    default:
      return state;
  }
};

const validator = (input) => {
  if (typeof input === "number") {
    return true;
  } else if (typeof input === "string") {
    if (input.trim().length === 0) {
      return false;
    } else {
      return true;
    }
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
    isTouched: false,
  });

  const inputChangeHandler = (e) => {
    dispatch({
      type: "CHANGE",
      value: e.target.value,
      isValid: validator(e.target.value),
    });
  };

  const touchHandler = () => {
    dispatch({ type: "TOUCHED" });
  };

  const element =
    props.element === "input" ? (
      <input
        type={props.type}
        id={props.id}
        onChange={inputChangeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        rows={props.rows || 3}
        id={props.id}
        onChange={inputChangeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  // props that are being passed to the parent
  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  return (
    <div
      className={`form-control ${
        inputState.isTouched && !inputState.isValid && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {inputState.isTouched && !inputState.isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
