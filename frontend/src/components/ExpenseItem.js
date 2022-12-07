import React, { useState } from "react";
import Button from "../shared/UIElements/Button";
import Modal from "../shared/UIElements/Modal";
import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteModalHandler = () => setShowDeleteModal(!showDeleteModal);

  return (
    <React.Fragment>
      {
        <Modal
          show={showDeleteModal}
          onCancel={deleteModalHandler}
          data={props}
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
