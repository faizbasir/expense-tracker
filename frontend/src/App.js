import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Expenses from "./pages/Expenses";
import NewExpense from "./pages/NewExpense";
import Navigation from "./shared/Navigation/Navigation";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
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
