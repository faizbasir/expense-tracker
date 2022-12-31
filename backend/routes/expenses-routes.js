const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense-controller");

router.get("/all-expenses", expenseController.getAllExpenses);

module.exports = router;
