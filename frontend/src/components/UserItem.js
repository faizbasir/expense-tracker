import { useHttpClient } from "../shared/util/hooks/http-hook";
import { AuthContext } from "../shared/context/auth-context";
import { useContext, useState } from "react";
import { HiOutlineTrash, HiPencil } from "react-icons/hi";
import Modal from "../shared/UIElements/Modal";
import ModalButton from "../shared/UIElements/ModalButton";

const UserItem = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteUserHandler = async () => {
    await sendRequest(
      `http://localhost:4000/api/users/${props.id}`,
      "DELETE",
      null,
      { Authorization: "Bearer " + auth.token }
    );
    props.onDelete();
  };

  const showModalHandler = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const deleteContent = (
    <>
      <div className="flex mb-4">
        <div className="text-left mr-4">
          <p>Name:</p>
          <p>Email:</p>
        </div>
        <div className="text-left">
          <p>{props.name}</p>
          <p>{props.email}</p>
        </div>
      </div>
      <div className="flex justify-evenly">
        <ModalButton danger onClick={deleteUserHandler}>
          Delete
        </ModalButton>
        <ModalButton modalButton onClick={showModalHandler}>
          Cancel
        </ModalButton>
      </div>
    </>
  );

  return (
    <>
      <Modal
        show={showDeleteModal}
        onCancel={showModalHandler}
        content={deleteContent}
        header="Are you sure you want to delete?"
      />
      <tbody className="bg-whitesmoke">
        <tr>
          <td className="pl-4 text-left text-md p-2">{props.id}</td>
          <td className="pl-4 text-left text-md p-2">{props.name}</td>
          <td className="pl-4 text-left text-md p-2">{props.email}</td>
          <td className="pl-4 text-left text-md p-2">{props.role}</td>
          <td className="pl-4 text-left text-md p-2">{props.active}</td>
          <td className="cursor-pointer text-2xl">
            <HiPencil />
          </td>
          <td className="cursor-pointer text-2xl">
            <HiOutlineTrash onClick={setShowDeleteModal} />
          </td>
        </tr>
      </tbody>
    </>
  );
};
export default UserItem;
