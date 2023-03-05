module.exports = (data, year) => {
  let expenseBreakdown = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  // console.log("overview");
  // console.log(data.expenses);

  data.expenses.forEach((expense) => {
    let dateArray = expense.date.split("-");
    if (dateArray[0] === year) {
      let month = parseInt(dateArray[1]);
      expenseBreakdown[month - 1] += parseInt(expense.amount);
      // console.log(expenseBreakdown);
    }
  });

  return expenseBreakdown;
};
