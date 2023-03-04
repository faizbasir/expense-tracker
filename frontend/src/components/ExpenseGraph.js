import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  CategoryScale, //x axis
  LinearScale, //y axis
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const ExpenseGraph = (props) => {
  const data = {
    labels: MONTHS,
    datasets: [
      {
        label: "Expenses",
        data: props.data.overview,
        backgroundColor: "white",
        borderColor: "white",
        borderWidth: 1,
        tension: 0.3,
      },
    ],
  };

  const options = {
    plugins: {
      legend: false,
    },

    scales: {
      y: {
        ticks: {
          color: "white",
        },
        min: 0,
      },
      x: {
        ticks: {
          color: "white",
        },
      },
    },
  };

  return (
    <React.Fragment>
      <div className="bg-tertiary rounded-lg p-6">
        <Line data={data} options={options} />
      </div>
    </React.Fragment>
  );
};

export default ExpenseGraph;
