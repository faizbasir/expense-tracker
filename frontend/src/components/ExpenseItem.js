import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalButton from "../shared/UIElements/ModalButton";
import Modal from "../shared/UIElements/Modal";
import { useHttpClient } from "../shared/util/hooks/http-hook";
import { AuthContext } from "../shared/context/auth-context";
import { HiOutlineTrash, HiPencil } from "react-icons/hi";

const ExpenseItem = (props) => {
  const auth = useContext(AuthContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const navigate = useNavigate();

  const deleteModalHandler = () => setShowDeleteModal(!showDeleteModal);

  const deleteHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:4000/api/expenses/${props.id}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      deleteModalHandler();
      props.onDelete();
    } catch (error) {}
  };

  const routeChangeHandler = () => {
    navigate(`/edit/${props.id}`);
  };

  const element = (
    <React.Fragment>
      <footer className="flex justify-evenly">
        <ModalButton danger onClick={deleteHandler}>
          Delete
        </ModalButton>
        <ModalButton modalButton onClick={deleteModalHandler} default>
          Cancel
        </ModalButton>
      </footer>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {
        <Modal
          header="Are you sure you want to delete?"
          show={showDeleteModal}
          onCancel={deleteModalHandler}
          content={element}
        />
      }

      <tbody>
        <tr>
          <td className="text-md p-2">{props.id}</td>
          <td className="text-md p-2">{props.summary}</td>
          <td className="text-md p-2">${props.amount}</td>
          <td className="text-md p-2">{props.date}</td>
          <td className="text-md p-2">{props.description}</td>
          <td className=" flex justify-evenly">
            <HiPencil
              className="cursor-pointer text-2xl"
              onClick={routeChangeHandler}
            />
            <HiOutlineTrash
              className="cursor-pointer text-2xl"
              onClick={deleteModalHandler}
              type="button"
            />
          </td>
        </tr>
      </tbody>
    </React.Fragment>
  );
};

export default ExpenseItem;
