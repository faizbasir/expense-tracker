import { validate } from "../util/Validator";

export const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.validators, action.value),
      };
    case "TOUCHED":
      return { ...state, isTouched: true };
    default:
      return state;
  }
};
