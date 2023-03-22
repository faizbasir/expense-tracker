import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalButton from "../shared/UIElements/ModalButton";
import Modal from "../shared/UIElements/Modal";
import { useHttpClient } from "../shared/util/hooks/http-hook";
import { AuthContext } from "../shared/context/auth-context";
import { HiOutlineTrash, HiPencil } from "react-icons/hi";
import { FiEye } from "react-icons/fi";

const ExpenseItem = (props) => {
  const auth = useContext(AuthContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [showRecordModal, setShowRecordModal] = useState(false);
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

  const viewRecordHandler = () => {
    setShowRecordModal(!showRecordModal);
  };

  const deleteModalElement = (
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

  const recordModalElement = (
    <>
      <div className="flex text-left px-4 mb-4">
        <div>
          <p>Txn ID:</p>
          <p>Txn Summary:</p>
          <p>Txn Amount:</p>
          <p>Txn Date:</p>
          <p>Txn Description:</p>
        </div>
        <div className="ml-8">
          <p>{props.id}</p>
          <p>{props.summary}</p>
          <p>${props.amount}</p>
          <p>{props.date}</p>
          <p>{props.description}</p>
        </div>
      </div>
      <ModalButton modalButton className="m-auto" onClick={viewRecordHandler}>
        Close
      </ModalButton>
    </>
  );

  return (
    <React.Fragment>
      {
        <Modal
          header="Are you sure you want to delete?"
          show={showDeleteModal}
          onCancel={deleteModalHandler}
          content={deleteModalElement}
        />
      }
      <Modal
        header="Transaction Details"
        show={showRecordModal}
        onCancel={viewRecordHandler}
        content={recordModalElement}
      />

      <tbody>
        <tr>
          <td className="text-md p-2">{props.id}</td>
          <td className="text-md p-2">{props.summary}</td>
          <td className="text-md p-2">${props.amount}</td>
          <td className="text-md p-2">{props.date}</td>
          <td className="text-md p-2">{props.type}</td>
          <td className="text-md p-2 truncate">{props.description}</td>
          <td className=" flex justify-evenly pt-2">
            <FiEye
              className="cursor-pointer text-2xl mr-2"
              onClick={viewRecordHandler}
            />
            <HiPencil
              className="cursor-pointer text-2xl mr-2"
              onClick={routeChangeHandler}
            />
            <HiOutlineTrash
              className="cursor-pointer text-2xl mr-2"
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
