import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import Button from "./Button";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";

const Modal = (props) => {
  return (
    <React.Fragment>
      <div className="fixed inset-0 backdrop-blur-sm">
        <div className="w-fit m-auto mt-40 bg-secondary rounded-xl border-solid border-2 border-white">
          <h1 className="text-white text-2xl p-4 text-center">
            {props.header}
          </h1>
          <h2 className="text-white text-lg p-4 text-center">
            {props.content}
          </h2>
          <footer className="p-4">{props.footer}</footer>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
