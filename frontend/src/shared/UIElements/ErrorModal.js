import Button from "./Button";
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
        <Button modalButton="true" onClick={props.onCancel}>
          Okay
        </Button>
      }
    />
  );
};

export default ErrorModal;
