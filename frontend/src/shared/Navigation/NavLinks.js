import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = () => {
  return (
    <ul className="nav-link">
      <li>
        <NavLink to="/dashboard" exact="true">
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/expenses" exact="true">
          Expenses
        </NavLink>
      </li>
      <li>
        <NavLink to="/new-expense" exact="true">
          New Expense
        </NavLink>
      </li>
      <li>
        <NavLink to="/" exact="true">
          Login
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
