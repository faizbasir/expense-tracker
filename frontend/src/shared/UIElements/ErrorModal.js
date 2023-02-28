import ErrorButton from "./ErrorButton";
import Modal from "./Modal";

const ErrorModal = (props) => {
  if (!!props.error === false) return null;

  return (
    <Modal
      onCancel={props.onCancel}
      header={"An unexpected error occured!"}
      content={props.error}
      show={!!props.error}
      footer={<ErrorButton onClick={props.onCancel}>Okay</ErrorButton>}
    />
  );
};

export default ErrorModal;
