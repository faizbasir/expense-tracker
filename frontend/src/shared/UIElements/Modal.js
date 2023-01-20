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
      <h3>{props.header}</h3>
      <div>{props.content}</div>
      {/* <footer>{props.footer}</footer> */}
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
        {<ModalOverlay {...props} />}
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
