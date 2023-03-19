import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Expenses from "./pages/Expenses";
import NewExpense from "./pages/NewExpense";
import Navigation from "./shared/Navigation/Navigation";
import Login from "./pages/Login";
import React, { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import { AuthContext } from "./shared/context/auth-context";
import { useState } from "react";
import { useCallback } from "react";
import EditExpense from "./pages/EditExpense";
import LandingPage from "./pages/LandingPage";
import Users from "./pages/Users";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = useCallback((user, token) => {
    setToken(token);
    setUser(user);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: user.id,
        name: user.name,
        email: user.email,
        token,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"))
    if (storedData.token){
      const user = {
        id: storedData.userId,
        email: storedData.email,
        name: storedData.name
      }
      login(user, storedData.token)
    }

  },[login])

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/new-expense" element={<NewExpense />} />
        <Route path="/edit/:expenseId" element={<EditExpense />} />
        <Route path="/:userId/expenses" element={<Expenses />} />
        <Route path="/:userId/dashboard" element={<Dashboard />} />
        <Route path="/:userId/users" element={<Users />} />
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
        <Route path="/" element={<LandingPage />} exact />
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
