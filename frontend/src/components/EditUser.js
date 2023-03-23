import React, { useState, useEffect } from "react";
import Button from "../shared/UIElements/Button";
import Input from "../shared/UIElements/Input";
import { useForm } from "../shared/util/hooks/form-hook";
import { useHttpClient } from "../shared/util/hooks/http-hook";
import { VALIDATOR_REQUIRED } from "../shared/util/Validator";

const EditUser = (props) => {
  const [active, setActive] = useState(true);
  const [role, setRole] = useState("user");
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      name: { value: "", isValid: false },
      email: { email: "", isValid: false },
      active,
      role,
    },
    false
  );

  const activeSelectorHandler = (e) => {
    setActive(e.target.value);
  };

  const roleSelectorHandler = (e) => {
    setRole(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formState.isValid) {
    } else {
      setFormData();
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const responseData = await sendRequest(
        `http:localhost:4000/api/users/${props.id}`
      );
    };
    fetchUser();
  }, [sendRequest]);

  return (
    <>
      <form onSubmit={submitHandler}>
        <Input
          element="input"
          id="name"
          label="Name"
          type="text"
          errorText="Please input a valid name"
          validators={[VALIDATOR_REQUIRED()]}
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="email"
          label="Email"
          type="email"
          errorText="Please input a valid name"
          validators={[VALIDATOR_REQUIRED()]}
          onInput={inputHandler}
        />
        <div className="flex justify-around">
          <div className="flex flex-col">
            <label htmlFor="active" className="font-bold">
              Active Status
            </label>
            <select
              name="active"
              id="active"
              value={active}
              onChange={activeSelectorHandler}
              placeholder={active}
              className="text-primary px-2 rounded-md mb-4"
            >
              <option value="true" selected>
                Active
              </option>
              <option value="false">Inactive</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="role" className="font-bold">
              Role
            </label>
            <select
              name="role"
              id="role"
              value={role}
              onChange={roleSelectorHandler}
              className="text-primary px-2 rounded-md mb-4"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>
        <Button type="submit" disabled={!formState.isValid}>
          Edit User
        </Button>
      </form>
    </>
  );
};

export default EditUser;
