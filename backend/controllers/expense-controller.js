const { v4: uuidv4 } = require("uuid");
const httpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Expense = require("../models/expenses");
const mongoose = require("mongoose");

const DUMMY_EXPENSES = [
  {
    id: "1",
    summary: "Petrol",
    amount: 20,
    description: "Pump petrol",
    date: "18/10/2022",
    user: "faizbasir",
  },
  {
    id: "2",
    summary: "Food",
    amount: 10,
    description: "Macdonald's meal",
    date: "18/10/2022",
    user: "faizbasir",
  },
  {
    id: "3",
    summary: "Airpods",
    amount: 350,
    description:
      "Black Friday sale jsnfjsndafjdnfasnfdsjanf dnfsdafnsnna jdnajksndajks ndajsnd",
    date: "18/10/2022",
    user: "u2",
  },
  {
    id: "4",
    summary: "speaker",
    amount: 350,
    description: "Black Friday sale",
    date: "18/10/2022",
    user: "u2",
  },
];

const id = {
  userId: (req) => {
    return req.params.uid;
  },
  expenseId: (req) => {
    return req.params.expenseId;
  },
};

// Get all expenses in db
// only for admin users
const getAllExpenses = async (req, res, next) => {
  let loadedExpenses;
  try {
    loadedExpenses = await Expense.find();
  } catch (error) {
    console.log(error);
    return next(new httpError("not able to fetch data", 500));
  }

  res.status(200).json({
    "All expenses": loadedExpenses.map((expense) =>
      expense.toObject({ getters: true })
    ),
  });
};

// getting all expenses for a user
const getExpensesByUserId = (req, res, next) => {
  const user = id.userId(req);

  const loadedExpenses = DUMMY_EXPENSES.filter((expense) => {
    return expense.user === user;
  });

  if (loadedExpenses.length !== 0) {
    res.status(200).json({ Expenses: loadedExpenses });
  } else {
    throw new httpError("No expenses found", 404);
  }
};

// get an expense by the expense id
const getExpenseById = async (req, res, next) => {
  const expenseId = id.expenseId(req);

  let expense;
  try {
    expense = await Expense.findById(expenseId);
  } catch (error) {
    console.log(error);
    return next(new httpError("not able to fetch data", 500));
  }

  if (expense) {
    res.status(200).json({ Expenses: expense.toObject({ getters: true }) });
  } else {
    return next(new httpError("No expense found", 404));
  }
};

// creating a new expense
const createNewExpense = async (req, res, next) => {
  // Input validation Step
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.errors);
    return next(new httpError("input validation error", 422));
  }

  // create new expense object
  const { summary, amount, description, date, user } = req.body;
  const createdExpense = new Expense({
    summary,
    amount,
    description,
    date,
    user,
  });

  // save new expense to db
  try {
    await createdExpense.save();
  } catch (error) {
    console.log(error);
    return next(new httpError("not able to create new expense", 500));
  }

  res.status(201).json({ Expense: createdExpense });
};

// delete expense
const deleteExpenseById = async (req, res, next) => {
  const expenseId = id.expenseId(req);

  // fetch expense from db
  let loadedExpense;
  try {
    loadedExpense = await Expense.findById(expenseId);
  } catch (error) {
    console.log(error);
    return next(new httpError("not able to fetch data", 500));
  }

  if (!loadedExpense) {
    return next(new httpError("expense not found", 404));
  }

  // delete expense from db
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await loadedExpense.remove({ session });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return next(new httpError("not able to delete entry from db", 500));
  }

  res.status(200).json({ Expenses: loadedExpense.toObject({ getters: true }) });
};

// update details of an expense
const updateExpenseById = async (req, res, next) => {
  // input validation step
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.errors);
    return next(new httpError("input validation error", 422));
  }

  const expenseId = id.expenseId(req);
  const { summary, amount, description, date } = req.body;

  // fetch expense from db
  let loadedExpense;
  try {
    loadedExpense = await Expense.findById(expenseId);
  } catch (error) {
    console.log(error);
    return next(new httpError("not able to fetch data", 500));
  }

  if (!loadedExpense) {
    return next(new httpError("not able to find expense", 404));
  }

  // update expense details with new details
  loadedExpense.summary = summary;
  loadedExpense.amount = amount;
  loadedExpense.description = description;
  loadedExpense.date = date;

  // update array with updated expense
  try {
    await loadedExpense.save();
  } catch (error) {
    console.log(error);
    return next(new httpError("not able to update expense", 500));
  }

  res
    .status(200)
    .json({ updatedExpense: loadedExpense.toObject({ getters: true }) });
};

exports.getAllExpenses = getAllExpenses;
exports.getExpensesByUserId = getExpensesByUserId;
exports.getExpenseById = getExpenseById;
exports.createNewExpense = createNewExpense;
exports.deleteExpenseById = deleteExpenseById;
exports.updateExpenseById = updateExpenseById;
