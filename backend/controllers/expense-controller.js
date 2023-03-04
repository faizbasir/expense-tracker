const httpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Expense = require("../models/expenses");
const User = require("../models/users");
const mongoose = require("mongoose");
const overview = require("../data-processing/overview");

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
    return next(new httpError("not able to fetch data", 500));
  }

  res.status(200).json({
    expenses: loadedExpenses.map((expense) =>
      expense.toObject({ getters: true })
    ),
  });
};

// getting expenses for overview
const getExpensesForOverview = async (req, res, next) => {
  const userId = id.userId(req);

  //fetch data from db
  let data;
  try {
    data = await User.findById(userId).populate("expenses");
  } catch (error) {
    return next(
      new httpError("Not able to fetch data @ expense-controller.js:42")
    );
  }

  if (data) {
    const filteredExpenses = overview(data);
    res.status(200).json({ overview: filteredExpenses });
  } else {
    return next(new httpError("No expenses found", 404));
  }
};

// getting all expenses for a user
const getExpensesByUserId = async (req, res, next) => {
  const userId = id.userId(req);

  // fetch data from db
  let userWithExpenses;
  try {
    userWithExpenses = await User.findById(userId).populate("expenses");
  } catch (error) {
    return next(
      new httpError("Not able to fetch data @ expense-controller.js:42", 500)
    );
  }

  if (userWithExpenses) {
    res.status(200).json({
      expenses: userWithExpenses.expenses.map((expense) =>
        expense.toObject({ getters: true })
      ),
    });
  } else {
    return next(new httpError("No expenses found", 404));
  }
};

// get an expense by the expense id
const getExpenseById = async (req, res, next) => {
  const expenseId = id.expenseId(req);

  let expense;
  try {
    expense = await Expense.findById(expenseId);
  } catch (error) {
    return next(
      new httpError("Not able to fetch data @ expense-controller.js:66", 500)
    );
  }

  if (expense) {
    res.status(200).json({ expense: expense.toObject({ getters: true }) });
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
    return next(
      new httpError("input validation error @ expense-controller.js:84", 422)
    );
  }

  // create new expense object
  const { summary, amount, description, date, creator } = req.body;
  const createdExpense = new Expense({
    summary,
    amount,
    description,
    date,
    creator,
  });

  // check if user exist to add expense to user
  let user;
  try {
    user = await User.findById(creator);
  } catch (error) {
    console.log(error);
    return next(
      new httpError("Not able to fetch data @ expense-controller.js:105", 500)
    );
  }

  if (!user) {
    return next(new httpError("User does not exist", 404));
  }

  // save new expense to db
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdExpense.save();
    user.expenses.push(createdExpense); // => add the mongo object id into user.expenses array
    await user.save({ session }); // => save changes made to user schema
    await session.commitTransaction();
  } catch (error) {
    return next(new httpError("Not able to create new expense", 500));
  }

  res.status(201).json({ expense: createdExpense });
};

// delete expense
const deleteExpenseById = async (req, res, next) => {
  const expenseId = id.expenseId(req);

  // fetch expense from db
  let loadedExpense;
  try {
    loadedExpense = await Expense.findById(expenseId).populate("creator");
  } catch (error) {
    console.log(error);
    return next(
      new httpError("Not able to fetch data @ expense-controller.js:140", 500)
    );
  }

  if (!loadedExpense) {
    return next(new httpError("expense not found", 404));
  }
  console.log(loadedExpense);

  // delete expense from db
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await loadedExpense.remove({ session }); // => remove expense from expense schema
    loadedExpense.creator.expenses.pull(loadedExpense); // => delete mongo object id from user.expenses array
    await loadedExpense.creator.save({ session }); // => save changes made to user schema
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return next(
      new httpError(
        "Not able to delete entry from db @ expense-controller.js:161",
        500
      )
    );
  }

  res.status(200).json({ Expense: loadedExpense.toObject({ getters: true }) });
};

// update details of an expense
const updateExpenseById = async (req, res, next) => {
  // input validation step
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.errors);
    return next(
      new httpError("Input validation error @ expense-controller.js:177", 422)
    );
  }

  const expenseId = id.expenseId(req);
  const { summary, amount, description, date } = req.body;

  // fetch expense from db
  let loadedExpense;
  try {
    loadedExpense = await Expense.findById(expenseId);
  } catch (error) {
    console.log(error);
    return next(
      new httpError("Not able to fetch data @ expense-controller.js:191", 500)
    );
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
    return next(
      new httpError(
        "Not able to update expense @ expense-controller.js:212",
        500
      )
    );
  }

  res.status(200).json({ expense: loadedExpense.toObject({ getters: true }) });
};

exports.getAllExpenses = getAllExpenses;
exports.getExpensesByUserId = getExpensesByUserId;
exports.getExpenseById = getExpenseById;
exports.createNewExpense = createNewExpense;
exports.deleteExpenseById = deleteExpenseById;
exports.updateExpenseById = updateExpenseById;
exports.getExpensesForOverview = getExpensesForOverview;
