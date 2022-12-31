const express = require("express");
const app = express();
const expenseRoutes = require("./routes/expenses-routes");

// app.use("/", (req, res, next) => {
//   res.send({ message: "this works" });
// });

app.use("/api/expenses", expenseRoutes);

app.listen(5000);
