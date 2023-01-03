const express = require("express");
const app = express();
const expenseRoutes = require("./routes/expenses-routes");
const userRoutes = require("./routes/user-routes");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use("/api/expenses", expenseRoutes);
app.use("/api/users", userRoutes);

app.use("/", (req, res, next) => {
  res.send({ message: "this works" });
});

app.listen(5000);
