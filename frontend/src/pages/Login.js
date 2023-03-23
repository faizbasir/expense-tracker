import React, { useContext, useState } from "react";
import Button from "../shared/UIElements/Button";
import Input from "../shared/UIElements/Input";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
} from "../shared/util/Validator";
import { AuthContext } from "../shared/context/auth-context";
import { useForm } from "../shared/util/hooks/form-hook";
import { useHttpClient } from "../shared/util/hooks/http-hook";
import ErrorModal from "../shared/UIElements/ErrorModal";
import image from "../shared/UIElements/images/landing.png";
import LoginPageAnimation from "../shared/UIElements/LoginPageAnimation";
import ImageUploader from "../components/ImageUploader";

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
        { ...formState.inputs, email: undefined, image: undefined },
        formState.inputs.name.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          email: { value: "", isValid: false },
          image: { value: null, isValid: false },
        },
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

    if (!formState.isValid) {
    } else {
      if (!isMember) {
        try {
          // use FormData to pass files instead of JSON objects
          const formData = new FormData();
          formData.append("name", formState.inputs.name.value);
          formData.append("password", formState.inputs.password.value);
          formData.append("email", formState.inputs.email.value);
          formData.append("image", formState.inputs.image.value);
          const responseData = await sendRequest(
            "http://localhost:4000/api/users/signup",
            "POST",
            formData
          );
          auth.login(responseData.user, responseData.token);
        } catch (error) {}
      } else {
        try {
          const responseData = await sendRequest(
            "http://localhost:4000/api/users/login",
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
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onCancel={clearError} />
      <div className="flex">
        <div className="w-[50%]">
          <img src={image} className="m-auto" />
          <LoginPageAnimation />
        </div>
        <form
          onSubmit={loginHandler}
          className="my-auto ml-20 text-white w-[30%]"
        >
          {!isMember && (
            <ImageUploader
              onInput={inputHandler}
              id="image"
              errorText="Please select a valid image"
            />
          )}
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
          {isMember && <Button disabled={!formState.isValid}>Login</Button>}
          {!isMember && <Button disabled={!formState.isValid}>Register</Button>}
          {memberCheck}
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
