const express = require("express");
const app = express();
const expenseRoutes = require("./routes/expenses-routes");
const userRoutes = require("./routes/user-routes");
const bodyParser = require("body-parser");
const httpError = require("./models/http-error");
const mongoose = require("mongoose");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/expenses", expenseRoutes);
app.use("/api/users", userRoutes);

// any other routes other than the 2 above
app.use((req, res, next) => {
  throw new httpError("Route not found", 404);
});

// Error messages thrown to this function
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code);
  res.json({ message: error.message });
});

mongoose
  .connect(
    "mongodb+srv://Faiz:hell0there@cluster0.984n5hr.mongodb.net/ExpenseManager?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((error) => {
    console.log(error);
  });
