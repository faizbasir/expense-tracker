import React, { useEffect, useReducer, useState } from "react";
import { inputReducer } from "../Reducers/InputReducer";

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || "",
    isValid: false,
    isTouched: false,
  });

  const inputChangeHandler = (e) => {
    dispatch({
      type: "CHANGE",
      value: e.target.value,
      validators: props.validators,
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
        className={`h-[35px] text-lg focus:outline-none  rounded-full my-[1rem] block w-[100%] border-solid  border-2 border-[#ccc] p-[1.2rem] ${
          inputState.isTouched && !inputState.isValid
            ? " bg-pink border-red text-tertiary "
            : "bg-secondary"
        }`}
      />
    ) : (
      <textarea
        rows={props.rows || 3}
        id={props.id}
        onChange={inputChangeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        className={`h-[35px] font-medium focus:outline-none  rounded-md my-[1rem] block w-[100%] border-solid  border-2 border-[#ccc] p-[0.8rem] ${
          inputState.isTouched && !inputState.isValid
            ? " bg-pink border-red  "
            : "bg-secondary"
        }`}
      />
    );

  // props that are being passed to the parent
  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  return (
    <div>
      <label htmlFor={props.id} className="block font-bold mt-[0.5rem]">
        {props.label}
      </label>
      {element}
      {inputState.isTouched && !inputState.isValid && (
        <p className="text-red font-semibold">{props.errorText}</p>
      )}
    </div>
  );
};

export default Input;
