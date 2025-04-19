import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../../assets/World-Leader-Styles/top10_graph.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MyChart = ({ xValues, yValues }) => {
  const barColors = ["rgb(99, 125, 154)"];

  const data = {
    labels: xValues,
    datasets: [{
      label: "Leadership Score",
      backgroundColor: barColors,
      data: yValues,
      borderWidth: 1,
      borderColor: "#fff"
    }]
  };
  const options = {
    responsive: true,
    plugins: {
      title: { display: true, text: "Top 10 Leaders of the World", font: { size: 30, weight: "bolder" }, color: "black" },
      legend: { display: false },
      tooltip: { backgroundColor: "rgba(188, 96, 96, 0.8)" }
    },
    scales: {
      x: { ticks: { color: "black" }, grid: { display: false } },
      y: { ticks: { color: "black" }, grid: { color: "#444" } }
    },
    elements: {
      bar: { barPercentage: 0.2,categoryPercentage: 0.2,barThickness: 0.2 }
    }
  };

  return (
    <div className="chart-section">
      <Bar className="bar-chart" data={data} options={options} />
    </div>
  );
};

export default MyChart;