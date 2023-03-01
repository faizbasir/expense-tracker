import ModalButton from "./ModalButton";
import Modal from "./Modal";

const ErrorModal = (props) => {
  if (!!props.error === false) return null;

  return (
    <Modal
      onCancel={props.onCancel}
      header={"An unexpected error occured!"}
      content={props.error}
      show={!!props.error}
      footer={
        <ModalButton modalButton={true} onClick={props.onCancel}>
          Okay
        </ModalButton>
      }
    />
  );
};

export default ErrorModal;
