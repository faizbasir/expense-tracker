const REQUIRED = "REQUIRED";
const MIN_LENGTH = "MIN_LENGTH";
const MAX_LENGTH = "MAX_LENGTH";

export const VALIDATOR_REQUIRED = () => ({ type: REQUIRED });
export const VALIDATOR_MINLENGTH = (val) => ({ type: MIN_LENGTH, value: val });
export const VALIDATOR_MAXLENGTH = (val) => ({ type: MAX_LENGTH, value: val });

export const validate = (validators, input) => {
  let isValid = false;
  for (const validator of validators) {
    if (validator.type === "REQUIRED") {
      isValid = input.trim().length >= 0;
    } else if (validator.type === "MIN_LENGTH") {
      isValid = input.trim().length >= validator.value;
    } else if (validator.type === "MAX_LENGTH") {
      isValid = input.trim().length <= validator.value;
    }
  }
  return isValid;
};
