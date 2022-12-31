import logo from "./logo.svg";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Expenses from "./pages/Expenses";
import NewExpense from "./pages/NewExpense";
import Navigation from "./shared/Navigation/Navigation";
import Login from "./pages/Login";
import React from "react";
import Dashboard from "./pages/Dashboard";
import { AuthContext } from "./shared/context/auth-context";
import { useState } from "react";
import { useCallback } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/new-expense" element={<NewExpense />} />
        <Route path="/:userId/expenses" element={<Expenses />} />
        {/* <Route path="/:userId/dashboard" element={<Dashboard />} /> */}
        <Route path="/:userId/dashboard" element={<Dashboard />} />
        <Route
          path="/login"
          element={<Navigate replace to="/:userId/dashboard" exact />}
        />
        <Route path="/" element={<Navigate replace to="/dashboard" exact />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="/login" element={<Login />} exact />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <BrowserRouter>
        <Navigation />
        <main>{routes}</main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
