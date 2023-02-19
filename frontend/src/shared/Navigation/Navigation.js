import React from "react";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

import "./Navigation.css";

const Navigation = () => {
  return (
    <React.Fragment>
      <MainHeader>
        <h2 className="text-white font-bold text-2xl ml-5 p-5 ">
          Expense Manager
        </h2>
        <nav className="">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default Navigation;
