import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../shared/UIElements/Button";
import Modal from "../shared/UIElements/Modal";
import { useHttpClient } from "../shared/util/hooks/http-hook";
import { AuthContext } from "../shared/context/auth-context";
import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  const auth = useContext(AuthContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const navigate = useNavigate();

  const deleteModalHandler = () => setShowDeleteModal(!showDeleteModal);

  const deleteHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/expenses/${props.id}`,
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
      <table className="modal-table">
        <thead>
          <tr>
            <th>Summary</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.summary}</td>
            <td>${props.amount}</td>
            <td>{props.date}</td>
          </tr>
        </tbody>
      </table>
      <footer>
        <Button danger onClick={deleteHandler}>
          Delete
        </Button>
        <Button onClick={deleteModalHandler} default>
          Cancel
        </Button>
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
          <td>{props.summary}</td>
          <td>${props.amount}</td>
          <td>{props.date}</td>
          <td>
            <div className="action">
              <Button default onClick={routeChangeHandler}>
                Edit
              </Button>
              <Button danger onClick={deleteModalHandler}>
                Delete
              </Button>
            </div>
          </td>
        </tr>
      </tbody>
    </React.Fragment>
  );
};

export default ExpenseItem;
