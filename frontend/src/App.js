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
import EditExpense from "./pages/EditExpense";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = useCallback((user, token) => {
    setToken(token);
    setUser(user);
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: user.id, token })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("userData");
  }, []);

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/new-expense" element={<NewExpense />} />
        <Route path="/edit/:expenseId" element={<EditExpense />} />
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
        isLoggedIn: !!token,
        user: user,
        token: token,
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
