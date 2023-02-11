import Button from "./Button";
import Modal from "./Modal";

const ErrorModal = (props) => {
  return (
    <Modal
      onCancel={props.onCancel}
      header={"An unexpected error occured!"}
      content={props.error}
      show={!!props.error}
      footer={
        <Button default onClick={props.onCancel}>
          Okay
        </Button>
      }
    />
  );
};

export default ErrorModal;
