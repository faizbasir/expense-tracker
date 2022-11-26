import React from "react";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

import "./Navigation.css";

const Navigation = () => {
  return (
    <React.Fragment>
      <MainHeader>
        <h2>Expense Manager</h2>
        <nav className="navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default Navigation;
