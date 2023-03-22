import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Colors } from "chart.js";
import { Line } from "react-chartjs-2";
import dataTemp from "../data/data";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Colors);

export default function Plot({ plotData }) {
  const options = {
    maintainAspectRatio: false,
    animation: true,
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: "Time Series Plot",
      },
      colors: {
        enabled: false,
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            return `x: ${context[0].label}`;
          },
          label: function (context) {
            return `y: ${context.raw}`;
          },
        },
        displayColors: false,
        backgroundColor: "rgba(0, 0, 0, 0)",
        bodyColor: "rgba(0, 0, 0, 1)",
        titleColor: "rgba(0, 0, 0, 1)",
        bodyFont: { weight: "bold" },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(0,0,0,0.7)",
        },
        border: {
          color: "rgb(243, 244, 246)",
        },
      },
      y: {
        grid: {
          color: "rgb(243, 244, 246)",
        },
        ticks: {
          color: "rgba(0,0,0,0.7)",
        },
        border: {
          color: "rgb(243, 244, 246)",
        },
      },
    },
  };

  const data = {
    labels: [...Array(plotData.data.length).keys()], // this creates an array from 0 to length of the data, which acts as the x-axis values
    datasets: [
      {
        data: plotData.data,
        borderColor: "rgb(253 186 116)",
        backgroundColor: "rgba(253 186 116)",
        borderWidth: 1.5,
        pointRadius: 1,
        pointHitRadius: 5,
      },
    ],
  };

  return (
    <div className="relative h-[75vh] w-full">
      <Line
        options={options}
        data={data}
      />
    </div>
  );
}
