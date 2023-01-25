import logo from "./logo.svg";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Expenses from "./pages/Expenses";
import NewExpense from "./pages/NewExpense";
import Navigation from "./shared/Navigation/Navigation";
import Login from "./pages/Login";
import React from "react";
import Dashboard from "./pages/Dashboard";
import { AuthContext } from "./shared/context/auth-context";
import { useState } from "react";
import { useCallback, useContext } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = useCallback((user) => {
    setIsLoggedIn(true);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/new-expense" element={<NewExpense />} />
        <Route path="/:userId/expenses" element={<Expenses />} />
        <Route path="/:userId/dashboard" element={<Dashboard />} />
        <Route
          path="/login"
          element={<Navigate to={`/${user.id}/dashboard`} exact />}
        />
        <Route path="/" element={<Navigate to={`/${user.id}/dashboard`} />} />
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
      value={{
        isLoggedIn: isLoggedIn,
        user: user,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter>
        <Navigation />
        <main>{routes}</main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
