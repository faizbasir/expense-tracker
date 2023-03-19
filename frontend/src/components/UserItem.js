import { useHttpClient } from "../shared/util/hooks/http-hook";
import { AuthContext } from "../shared/context/auth-context";
import { useContext } from "react";
import { HiOutlineTrash, HiPencil } from "react-icons/hi";

const UserItem = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest, error, clearError } = useHttpClient();

  const deleteUserHandler = async () => {
    await sendRequest(
      `http://localhost:4000/api/users/${props.id}`,
      "DELETE",
      null,
      { Authorization: "Bearer " + auth.token }
    );
    props.onDelete();
  };

  return (
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
        <HiOutlineTrash onClick={deleteUserHandler} />
      </td>
    </tr>
  );
};
export default UserItem;
