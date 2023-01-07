const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense-controller");
const { check } = require("express-validator");

router.get("/all-expenses", expenseController.getAllExpenses);
router.post(
  "/new-expense",
  [
    check("summary")
      .not()
      .isEmpty()
      .withMessage({ msg: "Summary cannot be empty" }),
    check("amount")
      .isNumeric()
      .withMessage({ msg: "Amount has to be a number" }),
    check("description")
      .isLength({ min: 5 })
      .withMessage({ msg: "Description has to be more than 5 characters" }),
    check("date")
      .isDate({ format: "DD/MM/YYYY" })
      .withMessage({ msg: "Date format: DD/MM/YYYY" }),
  ],
  expenseController.createNewExpense
);
router.get("/user/:uid", expenseController.getExpensesByUserId);
router.get("/:expenseId", expenseController.getExpenseById);
router.delete("/:expenseId", expenseController.deleteExpenseById);
router.patch(
  "/:expenseId",
  [
    check("summary")
      .not()
      .isEmpty()
      .withMessage({ msg: "Summary cannot be empty" }),
    check("amount")
      .isNumeric()
      .withMessage({ msg: "Amount has to be a number" }),
    check("description")
      .isLength({ min: 5 })
      .withMessage({ msg: "Description has to be more than 5 characters" }),
    check("date")
      .isDate({ format: "DD/MM/YYYY" })
      .withMessage({ msg: "Date format: DD/MM/YYYY" }),
  ],
  expenseController.updateExpenseById
);

module.exports = router;
