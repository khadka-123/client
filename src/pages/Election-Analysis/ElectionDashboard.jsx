// Frontend: src/components/ElectionDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import "../../assets/Election-Analysis-Styles/ElectionDashboard.css";

// Register required chart components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const CACHE_KEY_BASE = "election_analysis_data";

const ElectionDashboard = ({ party }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);

  const partyMapping = {
    BJP4India: { display: "BJP", logo: "/images/bjp-logo.jpg" },
    INCIndia: { display: "Congress", logo: "/images/congress-logo.png" },
    AamAadmiParty: { display: "AAP", logo: "/images/aap-logo.jpg" },
  };

  const partyInfo =
    partyMapping[party] || { display: party, logo: "/images/default-logo.png" };

  useEffect(() => {
    const cacheKey = `${CACHE_KEY_BASE}_${party}`;
    const cachedRaw = localStorage.getItem(cacheKey);
    let parsed = null;
    try {
      parsed = JSON.parse(cachedRaw);
    } catch {}
    // Validate structure: must have aggregated fields
    if (parsed && parsed.sentimentCounts && parsed.engagementData) {
      setDashboardData(parsed);
      console.log("Loaded dashboard data from localStorage");
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://server-drab-five.vercel.app/election_analysis/${party}`
          );
          const data = response.data.data;
          setDashboardData(data);
          localStorage.setItem(cacheKey, JSON.stringify(data));
          console.log("Fetched dashboard data from server and cached");
        } catch (err) {
          setError(err);
        }
      };
      fetchData();
    }
  }, [party]);

  if (error) return <div>Error loading dashboard data: {error.message}</div>;
  if (!dashboardData) return null;

  const {
    totalTweets,
    totalLikes,
    totalRetweets,
    sentimentCounts,
    verificationCounts,
    timeSeriesData,
    engagementData,
    topTweets,
  } = dashboardData;

  const pieOptions = {
    responsive: true,
    plugins: { legend: { position: "top" }, tooltip: { enabled: true } },
  };

  const lineChartOptions = {
    responsive: true,
    plugins: { legend: { position: "top" }, tooltip: { mode: "index", intersect: false } },
    scales: { x: { display: true }, y: { display: true, beginAtZero: true } },
  };

  const engagementOptions = {
    indexAxis: "y",
    responsive: true,
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
  };

  const sentimentPieData = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        data: [
          sentimentCounts.positive,
          sentimentCounts.neutral,
          sentimentCounts.negative,
        ],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
      },
    ],
  };

  const verificationPieData = {
    labels: ["Verified", "Unverified"],
    datasets: [
      {
        data: [verificationCounts.verified, verificationCounts.unverified],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  };

  const engagementBarData = {
    labels: engagementData.map((item) => item.metric),
    datasets: [
      {
        label: "Value",
        data: engagementData.map((item) => item.value),
        backgroundColor: "#0892D0",
      },
    ],
  };

  const lineChartData = {
    labels: timeSeriesData.map((item) => item.date),
    datasets: [
      {
        label: "Likes",
        data: timeSeriesData.map((item) => item.likes),
        borderColor: "#1DA1F2",
        backgroundColor: "#1DA1F2",
        tension: 0.4,
        fill: false,
      },
      {
        label: "Tweets",
        data: timeSeriesData.map((item) => item.tweets),
        borderColor: "#657786",
        backgroundColor: "#657786",
        tension: 0.4,
        fill: false,
      },
      {
        label: "Retweets",
        data: timeSeriesData.map((item) => item.retweets),
        borderColor: "#17BF63",
        backgroundColor: "#17BF63",
        tension: 0.4,
        fill: false,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <div className="header-container">
        <header className="dashboard-header">
          <div className="title">
            <h1>Twitter Analytics Dashboard</h1>
            <p>
              Analysis for: <strong>{partyInfo.display}</strong>
            </p>
          </div>
          <div className="party-info">
            <div className="party-badge">{partyInfo.display}</div>
            <img src={partyInfo.logo} alt="Party Logo" className="party-logo" />
          </div>
        </header>

        <div className="summary-cards">
          <div className="summary-card tweets">
            <h3>Total Tweets</h3>
            <div className="value">{totalTweets.toLocaleString()}</div>
          </div>
          <div className="summary-card likes">
            <h3>Total Likes</h3>
            <div className="value">{totalLikes.toLocaleString()}</div>
          </div>
          <div className="summary-card retweets">
            <h3>Total Retweets</h3>
            <div className="value">{totalRetweets.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="pie-chart-row">
        <div className="section-container">
          <h2>Sentiment Distribution</h2>
          <div className="chart-container_k">
            <Pie data={sentimentPieData} options={pieOptions} />
          </div>
        </div>
        <div className="section-container">
          <h2>Verification Distribution</h2>
          <div className="chart-container_k">
            <Pie data={verificationPieData} options={pieOptions} />
          </div>
        </div>
      </div>

      <div className="metrics-row">
        <div className="section-container">
          <h2>Activity Over Time</h2>
          <div className="chart-container_k">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>
        <div className="section-container">
          <h2>Engagement Metrics</h2>
          <div className="chart-container_k">
            <Bar data={engagementBarData} options={engagementOptions} />
          </div>
        </div>
      </div>

      <div className="section-container top-tweets">
        <h2>Top Performing Tweets</h2>
        {topTweets.map((tweet, idx) => (
          <div key={idx} className="tweet">
            <p className="tweet-text">"{tweet.Text}"</p>
            <div className="tweet-stats">
              <span className="likes">
                <i className="fas fa-heart"></i> {tweet.likeCount.toLocaleString()}
              </span>
              <span className="retweets">
                <i className="fas fa-retweet"></i> {tweet.Retweets.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectionDashboard;
