const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  expenses: [{ type: mongoose.Types.ObjectId, required: true, ref: "Expense" }],
  active: { type: String, required: true },
  image: { type: String, required: true },
  role: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
