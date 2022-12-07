import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import Button from "./Button";
import { CSSTransition } from "react-transition-group";

import "./Modal.css";
import { useRef } from "react";

const ModalOverlay = (props) => {
  const content = (
    <div className="modal__content">
      <h3>Are you sure you want to delete?</h3>
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
            <td>{props.data.summary}</td>
            <td>${props.data.amount}</td>
            <td>{props.data.date}</td>
            <td className="td-amount">{props.data.description}</td>
          </tr>
        </tbody>
      </table>
      <Button danger>Delete</Button>
      <Button onClick={props.onCancel} default>
        Cancel
      </Button>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal"));
};

const Modal = (props) => {
  const nodeRef = useRef(null);
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        timeout={200}
        mountOnEnter
        unmountOnExit
        classNames={"modal"}
      >
        {<ModalOverlay onCancel={props.onCancel} data={props.data} />}
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
