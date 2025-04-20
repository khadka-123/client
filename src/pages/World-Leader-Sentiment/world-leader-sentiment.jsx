import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyChart from './top10_graph';
import MyPieChart from './Pie_chart';
import '../../assets/World-Leader-Styles/world-leader-sentiment.css'
import HeaderComponent from "../../components/HeaderComponent_d";
import { useNavigate, useLocation } from 'react-router-dom';


function WorldLeader() {
    const predefinedLeaders = [
        "Anthony Albanese", "Benjamin Netanyahu", "Emmanuel Macron", "Justin Trudeau",
        "Keir Starmer", "Modi", "Olaf Scholz", "Putin",
        "Donald Trump", "Xi Jinping"
    ]; 

    const [leaderData, setLeaderData] = useState({
        top10: { names: predefinedLeaders, scores: new Array(10).fill(0) },
        sentiment: {}
    });

    const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

const activeTab = location.pathname === '/election-analysis' ? 'analysis' : 'prediction';


    useEffect(() => {
        axios.get('https://server-drab-five.vercel.app/api/leader_analysis?page=1&limit=50')
            .then((res) => {
                console.log("API Response:", res.data);

                if (!res.data.success || !res.data.data) {
                    console.error("Invalid API response format:", res.data);
                    return;
                }

                const leadersFromAPI = res.data.data;

                const scoreMap = {};
                const sentiment = {};

                leadersFromAPI.forEach((leader) => {
                    scoreMap[leader.leader_name] = leader.score || 0;

                    sentiment[leader.leader_name] = [
                        leader.positive_tweets || 0,
                        leader.neutral_tweets || 0,
                        leader.negative_tweets || 0
                    ];
                });

                const scores = predefinedLeaders.map((name) => scoreMap[name] || 50); // Default score if missing

                setLeaderData({
                    top10: { names: predefinedLeaders, scores },
                    sentiment
                });

                console.log("Processed Leader Data:", { names: predefinedLeaders, scores, sentiment });
            })
            .catch((err) => console.error('Error fetching data:', err));
    }, []);

    return (
        <>
         <HeaderComponent activeTab={activeTab} onTabClick={handleNavigation} />
        <div className="outer-container">
            {/* <h1 className="main-heading">Top 10 Leaders of the World</h1> */}

            {/* <div className="chart-section"> */}
                <MyChart xValues={leaderData.top10.names} yValues={leaderData.top10.scores} />
            {/* </div> */}

            {/* <hr className="divider" /> */}

            {/* <h2 className="section-title">Detail Sentiment Analysis Of All 10 Leader</h2> */}

            <div className="pie-charts">
                {leaderData.top10.names.slice(0, 9).map((leader) => (
                    <MyPieChart key={leader} leaderName={leader} yValues={leaderData.sentiment[leader] || [0, 0, 0]} />
                ))}
            </div>
        </div>
        </>
    );
}

export default WorldLeader;
