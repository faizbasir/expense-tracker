import React, { useState } from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../util/hooks/http-hook";

const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <ul className="flex">
      {auth.isLoggedIn && auth.user.role === "admin" && (
        <li className=" mr-5 h-[72px] py-5 text-white text-lg">
          <NavLink
            to={`/${auth.user.id}/users`}
            exact="true"
            className="hover:text-tertiary"
          >
            Users
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li className=" mr-5 h-[72px] py-5 text-white text-lg">
          <NavLink
            to={`/${auth.user.id}/dashboard`}
            exact="true"
            className="hover:text-tertiary"
          >
            Dashboard
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li className=" mr-5 h-[72px] py-5 text-white text-lg">
          <NavLink
            to={`/${auth.user.id}/expenses`}
            exact="true"
            className="hover:text-tertiary"
          >
            Expenses
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li className=" mr-5 h-[72px] py-5 text-white text-lg">
          <NavLink
            to="/new-expense"
            exact="true"
            className="hover:text-tertiary"
          >
            New Expense
          </NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li className=" mr-5 h-[72px] py-5 text-white text-lg">
          <NavLink to="/login" exact="true" className="hover:text-tertiary">
            Login
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li className=" mr-5 h-[72px] py-5 text-white text-lg">
          <NavLink
            to="/login"
            exact="true"
            onClick={auth.logout}
            className="hover:text-tertiary"
          >
            Logout
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
