import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../shared/context/auth-context";
import Button from "../shared/UIElements/Button";
import Input from "../shared/UIElements/Input";
import { useForm } from "../shared/util/hooks/form-hook";
import { useHttpClient } from "../shared/util/hooks/http-hook";
import { VALIDATOR_REQUIRED } from "../shared/util/Validator";
import ModalButton from "../shared/UIElements/ModalButton";
import { useNavigate } from "react-router-dom";

const EditUser = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate;
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

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!formState.isValid) {
    } else {
      try {
        await sendRequest(
          `http://localhost:4000/api/users/${props.id}`,
          "PATCH",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            active,
            role,
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        if (!isLoading) {
          props.onCancel();
          props.onReload();
        }
      } catch (error) {}
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:4000/api/users/${props.id}`,
          "GET",
          null,
          { Authorization: "Bearer " + auth.token }
        );
        setActive(responseData.user.active);
        setRole(responseData.user.role);
        setFormData(
          {
            name: { value: responseData.user.name, isValid: true },
            email: { value: responseData.user.email, isValid: true },
            active: { value: responseData.user.active, isValid: true },
            role: { value: responseData.user.role, isValid: true },
          },
          true
        );
      } catch (error) {}
    };
    fetchUser();
  }, [sendRequest, props.id, auth.token]);

  return (
    <>
      {!isLoading && (
        <form onSubmit={submitHandler}>
          <Input
            element="input"
            id="name"
            label="Name"
            type="text"
            errorText="Please input a valid name"
            validators={[VALIDATOR_REQUIRED()]}
            onInput={inputHandler}
            value={formState.inputs.name.value}
          />
          <Input
            element="input"
            id="email"
            label="Email"
            type="email"
            errorText="Please input a valid name"
            validators={[VALIDATOR_REQUIRED()]}
            onInput={inputHandler}
            value={formState.inputs.email.value}
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
          <ModalButton modalButton type="submit" disabled={!formState.isValid}>
            Edit User
          </ModalButton>
        </form>
      )}
    </>
  );
};

export default EditUser;
