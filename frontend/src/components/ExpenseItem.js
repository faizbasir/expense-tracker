import React, { useState } from "react";
import Button from "../shared/UIElements/Button";
import Modal from "../shared/UIElements/Modal";
import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteModalHandler = () => setShowDeleteModal(!showDeleteModal);

  const element = (
    <React.Fragment>
      <table className="modal-table">
        <thead>
          <tr>
            <th>Summary</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.summary}</td>
            <td>${props.amount}</td>
            <td>{props.date}</td>
            <td className="td-amount">{props.description}</td>
          </tr>
        </tbody>
      </table>
      <Button danger>Delete</Button>
      <Button onClick={deleteModalHandler} default>
        Cancel
      </Button>
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
          <td className="td-amount">{props.description}</td>
          <td>
            <div className="action">
              <Button default>Edit</Button>
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
