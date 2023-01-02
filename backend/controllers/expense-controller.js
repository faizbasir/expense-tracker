const { v4: uuidv4 } = require("uuid");

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

const getAllExpenses = (req, res, next) => {
  res.status(200).json({ "All Expenses": DUMMY_EXPENSES });
};

const getExpensesByUserId = (req, res, next) => {
  const user = id.userId(req);

  const loadedExpenses = DUMMY_EXPENSES.filter((expense) => {
    return expense.user === user;
  });
  res.status(200).json({ Expenses: loadedExpenses });
};

const getExpenseById = (req, res, next) => {
  const expenseId = id.expenseId(req);

  const loadedExpense = DUMMY_EXPENSES.find((expense) => {
    return expense.id === expenseId;
  });
  res.status(200).json({ loadedExpense });
};

const createNewExpense = (req, res, next) => {
  const { summary, amount, description, date, user } = req.body;
  const createdExpense = {
    id: uuidv4(),
    summary,
    amount,
    description,
    date,
    user,
  };
  DUMMY_EXPENSES.push(createdExpense);
  res.status(201).json({ Expense: createdExpense });
};

const deleteExpenseById = (req, res, next) => {
  const expenseId = id.expenseId(req);

  // find index of expense to be deleted
  const expenseIndex = DUMMY_EXPENSES.indexOf(
    DUMMY_EXPENSES.find((expense) => {
      return expense.id === expenseId;
    })
  );

  // dropping the item in the array
  DUMMY_EXPENSES.splice(expenseIndex, 1);

  res.status(200).json({ Expenses: DUMMY_EXPENSES });
};

const updateExpenseById = (req, res, next) => {
  const expenseId = id.expenseId(req);
  const { summary, amount, description, date } = req.body;

  // find index of expense to be updated
  const expenseIndex = DUMMY_EXPENSES.indexOf(
    DUMMY_EXPENSES.find((expense) => {
      return expense.id === expenseId;
    })
  );

  // find expense to be updated
  const loadedExpense = DUMMY_EXPENSES.find((expense) => {
    return expense.id === expenseId;
  });

  // update expense details with new details
  loadedExpense.summary = summary;
  loadedExpense.amount = amount;
  loadedExpense.description = description;
  loadedExpense.date = date;

  // update array with updated expense
  DUMMY_EXPENSES[expenseIndex] = loadedExpense;

  res.status(200).json({ updatedExpense: loadedExpense });
};

exports.getAllExpenses = getAllExpenses;
exports.getExpensesByUserId = getExpensesByUserId;
exports.getExpenseById = getExpenseById;
exports.createNewExpense = createNewExpense;
exports.deleteExpenseById = deleteExpenseById;
exports.updateExpenseById = updateExpenseById;
