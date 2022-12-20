import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Expenses from "./pages/Expenses";
import NewExpense from "./pages/NewExpense";
import Navigation from "./shared/Navigation/Navigation";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/expenses" element={<Expenses />} /> */}
          <Route path="/new-expense" element={<NewExpense />} />
          <Route path="/:userId/expenses" element={<Expenses />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
