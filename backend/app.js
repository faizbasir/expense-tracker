const express = require("express");
const app = express();

app.use("/", (req, res, next) => {
  res.send({ message: "this works" });
});

app.listen(5000);
