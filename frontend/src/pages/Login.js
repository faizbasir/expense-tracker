import React, { useCallback, useReducer, useState } from "react";
import Button from "../shared/UIElements/Button";
import Input from "../shared/UIElements/Input";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
} from "../shared/util/Validator";
import { AuthContext } from "../shared/context/auth-context";

import "./Login.css";
import { useContext } from "react";
import { useForm } from "../shared/util/hooks/form-hook";
import { useHttpClient } from "../shared/util/hooks/http-hook";
import ErrorModal from "../shared/UIElements/ErrorModal";

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
      Not a member? Register <a onClick={toggleMember}>here</a>
    </p>
  ) : (
    <p>
      Already a member? Login <a onClick={toggleMember}>here</a>
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
        console.log(responseData);
        // auth.login(responseData.user, responseData.token);
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
        console.log(responseData);
        auth.login(responseData.user, responseData.token);
      } catch (error) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onCancel={clearError} />
      <form onSubmit={loginHandler} className="login-form">
        {isMember ? <h1>Login</h1> : <h1>Register</h1>}
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
    </React.Fragment>
  );
};

export default Login;
