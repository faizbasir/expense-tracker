import React from "react";
import { useParams } from "react-router-dom";
import ExpenseList from "../components/ExpenseList";

const DUMMY_EXPENSES1 = [];

const DUMMY_EXPENSES = [
  {
    id: 1,
    summary: "Petrol",
    amount: 20,
    description: "Pump petrol",
    date: "18/10/2022",
    user: "faizbasir",
  },
  {
    id: 2,
    summary: "Food",
    amount: 10,
    description: "Macdonald's meal",
    date: "18/10/2022",
    user: "faizbasir",
  },
  {
    id: 3,
    summary: "Airpods",
    amount: 350,
    description:
      "Black Friday sale jsnfjsndafjdnfasnfdsjanf dnfsdafnsnna jdnajksndajks ndajsnd",
    date: "18/10/2022",
    user: "u2",
  },
  {
    id: 4,
    summary: "speaker",
    amount: 350,
    description: "Black Friday sale",
    date: "18/10/2022",
    user: "u2",
  },
];

const Expenses = () => {
  const loadedExpenses = DUMMY_EXPENSES.filter(
    (item) => item.user === "faizbasir"
  );

  return <ExpenseList items={loadedExpenses} />;
};

export default Expenses;
