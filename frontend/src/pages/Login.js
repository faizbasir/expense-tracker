import React, { useCallback, useReducer, useState } from "react";
import { formReducer } from "../shared/Reducers/FormReducer";
import Button from "../shared/UIElements/Button";
import Input from "../shared/UIElements/Input";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
} from "../shared/util/Validator";

import "./Login.css";

const initialState = {
  username: "",
  email: "",
  password: "",
  isMember: true,
};

const Login = () => {
  const [isMember, setIsMember] = useState(true);
  const [values, setValues] = useState(initialState);

  const toggleMember = () => {
    setIsMember(!isMember);
  };

  console.log(isMember, values.isMember);
  const memberCheck = isMember ? (
    <p>
      Not a member? Register <a onClick={toggleMember}>here</a>
    </p>
  ) : (
    <p>
      Already a member? Login <a onClick={toggleMember}>here</a>
    </p>
  );

  const changeHandler = useCallback((id, value, isValid) => {
    console.log(id, value, isValid);
  });
  const loginHandler = () => {};

  return (
    <React.Fragment>
      <form onSubmit={loginHandler} className="login-form">
        {isMember ? <h1>Login</h1> : <h1>Register</h1>}
        <Input
          id="username"
          label="Username"
          errorText="Please input a valid username"
          element="input"
          type="text"
          onInput={changeHandler}
          validators={[VALIDATOR_MINLENGTH(5)]}
        />
        {!isMember && (
          <Input
            id="email"
            label="Email"
            errorText="Please input a valid email"
            element="input"
            type="email"
            onInput={changeHandler}
            validators={[VALIDATOR_REQUIRED()]}
          />
        )}
        <Input
          id="password"
          label="Password"
          errorText="Please input a valid password"
          element="input"
          type="password"
          onInput={changeHandler}
          validators={[VALIDATOR_MINLENGTH(8), VALIDATOR_MAXLENGTH(12)]}
        />
        <Button default>Login</Button>
        {memberCheck}
      </form>
    </React.Fragment>
  );
};

export default Login;
