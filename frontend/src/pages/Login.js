import React, { useContext, useState } from "react";
import Button from "../shared/UIElements/Button";
import Input from "../shared/UIElements/Input";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
} from "../shared/util/Validator";
import { AuthContext } from "../shared/context/auth-context";
// import "./Login.css";
import { useForm } from "../shared/util/hooks/form-hook";
import { useHttpClient } from "../shared/util/hooks/http-hook";
import ErrorModal from "../shared/UIElements/ErrorModal";
import image from "../shared/UIElements/images/landing.png";

const Login = () => {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [isMember, setIsMember] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      name: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );

  const toggleMember = () => {
    if (!isMember) {
      setFormData(
        { ...formState.inputs, email: undefined },
        formState.inputs.name.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        { ...formState.inputs, email: { value: "", isValid: false } },
        false
      );
    }
    setIsMember((prevMode) => !prevMode);
  };

  const memberCheck = isMember ? (
    <p>
      Not a member? Register{" "}
      <a
        className="text-secondary underline decoration-solid cursor-pointer hover:text-white"
        onClick={toggleMember}
      >
        here
      </a>
    </p>
  ) : (
    <p>
      Already a member? Login{" "}
      <a
        className="text-secondary underline decoration-solid cursor-pointer hover:text-white"
        onClick={toggleMember}
      >
        here
      </a>
    </p>
  );

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!isMember) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            password: formState.inputs.password.value,
            email: formState.inputs.email.value,
          }),
          { "Content-Type": "application/json" }
        );
        auth.login(responseData.user, responseData.token);
      } catch (error) {}
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );
        auth.login(responseData.user, responseData.token);
      } catch (error) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onCancel={clearError} />
      <div className="flex">
        <div className="w-[50%]">
          <img src={image} className="m-auto" />
          <h3 className="m-auto w-fit text-white">
            Start tracking your spending today!
          </h3>
        </div>
        <form
          onSubmit={loginHandler}
          className="my-auto ml-20 text-white w-[30%]"
        >
          {/* {isMember ? <h1>Login</h1> : <h1>Register</h1>} */}
          <Input
            id="name"
            label="Name"
            errorText="Please input a valid username"
            element="input"
            type="text"
            onInput={inputHandler}
            validators={[VALIDATOR_MINLENGTH(5)]}
          />
          {!isMember && (
            <Input
              id="email"
              label="Email"
              errorText="Please input a valid email"
              element="input"
              type="email"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRED()]}
            />
          )}
          <Input
            id="password"
            label="Password"
            errorText="Please input a valid password"
            element="input"
            type="password"
            onInput={inputHandler}
            validators={[VALIDATOR_MINLENGTH(6), VALIDATOR_MAXLENGTH(12)]}
          />
          {isMember && (
            <Button default disabled={!formState.isValid}>
              Login
            </Button>
          )}
          {!isMember && (
            <Button default disabled={!formState.isValid}>
              Register
            </Button>
          )}
          {memberCheck}
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
