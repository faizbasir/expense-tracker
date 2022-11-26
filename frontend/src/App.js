import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Expenses from "./pages/Expenses";
import NewExpense from "./pages/NewExpense";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/new-expense" element={<NewExpense />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
