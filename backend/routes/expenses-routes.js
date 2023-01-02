const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense-controller");

router.get("/all-expenses", expenseController.getAllExpenses);
router.post("/new-expense", expenseController.createNewExpense);
router.get("/user/:uid", expenseController.getExpensesByUserId);
router.get("/:expenseId", expenseController.getExpenseById);
router.delete("/:expenseId", expenseController.deleteExpenseById);
router.patch("/:expenseId", expenseController.updateExpenseById);

module.exports = router;
