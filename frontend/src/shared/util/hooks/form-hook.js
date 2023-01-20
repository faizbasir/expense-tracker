import { useState, useReducer, useCallback } from "react";
import { formReducer } from "../../Reducers/FormReducer";

export const useForm = (inputs, validity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs,
    isValid: validity,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      id,
      value,
      isValid,
    });
  }, []);

  const setFormData = (inputs, isValid) => {
    dispatch({
      type: "MEMBER_CHANGE",
      inputs,
      isValid,
    });
  };

  return [formState, inputHandler, setFormData];
};
