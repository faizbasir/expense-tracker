import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = () => {
  return (
    <ul className="nav-link">
      <li>
        <NavLink to="/">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/expenses" exact>
          Expenses
        </NavLink>
      </li>
      <li>
        <NavLink to="/new-expense" exact>
          New Expense
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
