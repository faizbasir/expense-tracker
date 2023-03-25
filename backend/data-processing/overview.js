module.exports = (data, year) => {
  let cashFlowBreakdown = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  data.expenses.forEach((expense) => {
    let dateArray = expense.date.split("-");
    if (dateArray[0] === year && expense.type === "expense") {
      let month = parseInt(dateArray[1]);
      cashFlowBreakdown[month - 1] -= parseFloat(expense.amount);
    } else if (dateArray[0] === year && expense.type === "income") {
      let month = parseInt(dateArray[1]);
      cashFlowBreakdown[month - 1] += parseFloat(expense.amount);
    }
  });

  return cashFlowBreakdown;
};
