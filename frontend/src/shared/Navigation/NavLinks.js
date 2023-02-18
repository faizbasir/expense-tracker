import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

import "./NavLinks.css";

const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-link">
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.user.id}/dashboard`} exact="true">
            Dashboard
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.user.id}/expenses`} exact="true">
            Expenses
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/new-expense" exact="true">
            New Expense
          </NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/login" exact="true">
            Login
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/login" exact="true" onClick={auth.logout}>
            Logout
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
