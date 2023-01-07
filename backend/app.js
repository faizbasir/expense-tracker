const express = require("express");
const app = express();
const expenseRoutes = require("./routes/expenses-routes");
const userRoutes = require("./routes/user-routes");
const bodyParser = require("body-parser");
const httpError = require("./models/http-error");

app.use(bodyParser.json());
app.use("/api/expenses", expenseRoutes);
app.use("/api/users", userRoutes);

// any other routes other than the 2 above
app.use((req, res, next) => {
  throw new httpError("Route not found", 404);
});

// Error messages thrown to this function
app.use((error, req, res, next) => {
  res.status(error.code);
  res.json({ message: error.message });
});

app.listen(5000);
