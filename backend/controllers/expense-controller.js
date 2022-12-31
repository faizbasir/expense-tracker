const DUMMY_EXPENSES = [
  {
    id: 1,
    summary: "Petrol",
    amount: 20,
    description: "Pump petrol",
    date: "18/10/2022",
    user: "faizbasir",
  },
  {
    id: 2,
    summary: "Food",
    amount: 10,
    description: "Macdonald's meal",
    date: "18/10/2022",
    user: "faizbasir",
  },
  {
    id: 3,
    summary: "Airpods",
    amount: 350,
    description:
      "Black Friday sale jsnfjsndafjdnfasnfdsjanf dnfsdafnsnna jdnajksndajks ndajsnd",
    date: "18/10/2022",
    user: "u2",
  },
  {
    id: 4,
    summary: "speaker",
    amount: 350,
    description: "Black Friday sale",
    date: "18/10/2022",
    user: "u2",
  },
];

const getAllExpenses = (req, res, next) => {
  res.status(200).json({ "All Expenses": DUMMY_EXPENSES });
};

exports.getAllExpenses = getAllExpenses;
