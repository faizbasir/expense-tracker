import React, { useContext } from "react";
import { AuthContext } from "../shared/context/auth-context";
import image from "../shared/UIElements/images/landing.jpg";

const UserProfile = () => {
  const auth = useContext(AuthContext);

  return (
    <React.Fragment>
      <div className="bg-secondary p-8 rounded-[2rem]">
        <img
          src={image}
          className="w-[170px] h-[170px] m-auto mb-6 rounded-lg"
        />
        <div className="p-4">
          <h3 className="my-4">{`UID: ${auth.user.id}`}</h3>
          <h3 className="my-4">{`Username: ${auth.user.name}`}</h3>
          <h3 className="my-4">{`Email: ${auth.user.email}`}</h3>
          <h3 className="my-4">{`Role: ${auth.user.role}`}</h3>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
