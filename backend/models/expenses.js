const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expensesSchema = new Schema({
  summary: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: String, required: true },
  date: { type: String, required: true },
  type:{type: String, required: true},
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Expense", expensesSchema);
