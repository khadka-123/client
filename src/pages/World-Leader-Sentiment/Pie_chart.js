import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import '../../assets/World-Leader-Styles/pie_chart.css';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const MyPieChart = ({ leaderName, yValues }) => {
  const xValues = ["Positive", "Neutral", "Negative"];
  const barColors = ["#4CAF50", "#FFC107", "#F44336"];

  const data = {
    labels: xValues,
    datasets: [{ backgroundColor: barColors, data: yValues, borderWidth: 2, borderColor: "#fff" }]
  };

  const options = {
    responsive: true,
    plugins: {
      title: { display: true, text: leaderName, font: { size: 30, weight: "bold" }, color: '#ff' },
      legend: { position: 'top', labels: { font: { size: 15, weight: "bold" }, color: '#ff' } }
    }
  };

  return (
    <div className='pie-container'>
      {/* <h2 className='chart-title'>Sentiment Analysis of {leaderName}</h2> */}
      <Pie data={data} options={options} />
    </div>
  );
};

export default MyPieChart;
