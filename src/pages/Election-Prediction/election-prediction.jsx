import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import HeaderComponent from '../../../src/components/HeaderComponent';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const [aggregatedData, setAggregatedData] = useState(null);

  useEffect(() => {
    fetch('https://server-drab-five.vercel.app/election_prediction')
      .then((res) => res.json())
      .then((data) => setAggregatedData(data))
      .catch((error) => console.error('Error fetching aggregated data:', error));
  }, []);

  let voteData = {
    labels: ['BJP', 'Congress', 'AAP'],
    datasets: [{}],
  };

  let engagementData = null;
  let leadingParty = {};

  if (aggregatedData) {
    const parties = ['BJP', 'Congress', 'AAP'];
    voteData = {
      labels: parties,
      datasets: [
        {
          label: 'Predicted Vote Share (%)',
          data: parties.map((p) => aggregatedData[p]?.votePercentage || 0),
          backgroundColor: ['#ef4444', '#3b82f6', '#f59e0b'],
        },
      ],
    };

    engagementData = {
      labels: parties,
      datasets: [
        {
          label: 'Likes',
          data: parties.map((p) => aggregatedData[p]?.likes || 0),
          backgroundColor: '#ef4444',
        },
        {
          label: 'Retweets',
          data: parties.map((p) => aggregatedData[p]?.retweets || 0),
          backgroundColor: '#3b82f6',
        },
        {
          label: 'Tweet Count',
          data: parties.map((p) => aggregatedData[p]?.tweetCount || 0),
          backgroundColor: '#f59e0b',
        },
      ],
    };

    leadingParty = parties.reduce(
      (leader, party) => {
        const vote = aggregatedData[party]?.votePercentage || 0;
        return vote > leader.votePercentage
          ? { name: party, votePercentage: vote }
          : leader;
      },
      { name: '', votePercentage: 0 }
    );
  }

  ChartJS.defaults.color = '#607B94';

  const activeTab = location.pathname === '/election-analysis' ? 'analysis' : 'prediction';

  const partyColors = {
    BJP: "#ef4444",
    Congress: "#3b82f6",
    AAP: "#f59e0b",
  };

  return (
    <AppContainer>
      <HeaderComponent activeTab={activeTab} onTabClick={handleNavigation} />
      <MainContent>
        <CardGrid>
          <Card>
            <h3>Predicted Vote Share</h3>
            <BarChartWrapper>
              <Bar
                data={voteData}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } },
                }}
              />
            </BarChartWrapper>
            <CardContent>
              Based on Twitter engagement patterns over the last 2 years
            </CardContent>
          </Card>

          <Card>
            <h3>Leading Party Prediction</h3>
            <PredictionSummary>
              <PredictionItem>
                <PredictionValue1 percentage={leadingParty.votePercentage}>
                  {leadingParty.votePercentage}%
                </PredictionValue1>
                <PredictionLabel>Leading Party Prediction</PredictionLabel>
              </PredictionItem>
              <PredictionItem>
                <PartyTag color={partyColors[leadingParty.name]}>{leadingParty.name}</PartyTag>
              </PredictionItem>
            </PredictionSummary>
            <CardContent>
              {leadingParty.name} maintains lead with strong engagement and positive sentiment
            </CardContent>
            <SentimentWrapper>
              <SentimentItem>
                <SentimentLabel>Positive Tweets</SentimentLabel>
                <SentimentValue style={{ color: 'green' }}>
                  {aggregatedData && aggregatedData[leadingParty.name]
                    ? aggregatedData[leadingParty.name].positiveTweets
                    : 0}
                </SentimentValue>
              </SentimentItem>
              <SentimentItem>
                <SentimentLabel>Neutral Tweets</SentimentLabel>
                <SentimentValue style={{ color: 'grey' }}>
                  {aggregatedData && aggregatedData[leadingParty.name]
                    ? aggregatedData[leadingParty.name].neutralTweets
                    : 0}
                </SentimentValue>
              </SentimentItem>
              <SentimentItem>
                <SentimentLabel>Negative Tweets</SentimentLabel>
                <SentimentValue style={{ color: '#ef4444' }}>
                  {aggregatedData && aggregatedData[leadingParty.name]
                    ? aggregatedData[leadingParty.name].negativeTweets
                    : 0}
                </SentimentValue>
              </SentimentItem>
            </SentimentWrapper>
          </Card>


          <Card>
            <h3>Trending Topics</h3>
            <CardContent>
              {['BJP', 'Congress', 'AAP'].map((party) => (
                <div key={party}>
                  <PartyTag color={partyColors[party]}>{party}</PartyTag>{" "}
                  {aggregatedData && aggregatedData[party] && aggregatedData[party].trendingTopics && aggregatedData[party].trendingTopics.length > 0
                    ? aggregatedData[party].trendingTopics.join(', ')
                    : 'No trending topics'}
                  <br />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <h3>Twitter Engagement Metrics</h3>
            <PredictionSummary>
              {engagementData ? (
                <>
                  <PredictionItem>
                    <PredictionValue>
                      {engagementData.datasets[0].data
                        .reduce((a, b) => a + b, 0)
                        .toLocaleString('en-IN')}
                    </PredictionValue>
                    <PredictionLabel>Total Likes</PredictionLabel>
                  </PredictionItem>
                  <PredictionItem>
                    <PredictionValue>
                      {engagementData.datasets[1].data
                        .reduce((a, b) => a + b, 0)
                        .toLocaleString('en-IN')}
                    </PredictionValue>
                    <PredictionLabel>Total Retweets</PredictionLabel>
                  </PredictionItem>
                  <PredictionItem>
                    <PredictionValue>
                      {engagementData.datasets[2].data
                        .reduce((a, b) => a + b, 0)
                        .toLocaleString('en-IN')}
                    </PredictionValue>
                    <PredictionLabel>Total Mentions</PredictionLabel>
                  </PredictionItem>
                </>
              ) : (
                <>
                  <PredictionItem>
                    <PredictionValue>3.2M</PredictionValue>
                    <PredictionLabel>Total Mentions</PredictionLabel>
                  </PredictionItem>
                  <PredictionItem>
                    <PredictionValue>12.8M</PredictionValue>
                    <PredictionLabel>Total Likes</PredictionLabel>
                  </PredictionItem>
                  <PredictionItem>
                    <PredictionValue>5.4M</PredictionValue>
                    <PredictionLabel>Retweets</PredictionLabel>
                  </PredictionItem>
                </>
              )}
            </PredictionSummary>
            <CardContent>
              Engagement data collected from 15000+ political tweets
            </CardContent>
          </Card>
        </CardGrid>
      </MainContent>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: black;
  background-color: rgba(0, 0, 0, 0.28); /* Add a semi-transparent overlay */
  background-blend-mode: overlay; /* Blend the overlay with the background image */
  background-image: url('/images/bg2.jpg');
  background-size: cover;
`;

const MainContent = styled.main`
  padding: 1rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid rgb(183, 183, 183);
  color: black;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }
`;

const BarChartWrapper = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardContent = styled.p`
  font-size: 1rem;
  color: rgb(51, 65, 88);
  text-align:left;
  margin-left:6rem;
`;

const PredictionSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const PredictionItem = styled.div`
  text-align: center;
`;

const PartyTag = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  margin: 0.6rem;
  color: white;
  background-color: ${(props) => props.color};
`;

const PredictionValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: rgb(42, 98, 167);
  margin: 5px;
`;

const PredictionValue1 = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: rgb(255, 255, 255);
  background: #3b82f6;
  width: ${({ percentage }) => `${percentage + 50}%`};
  height: 30px;
  border-radius: 8px;
  text-align: center;
  line-height: 30px;
`;

const PredictionLabel = styled.div`
  font-size: 0.75rem;
  color: rgba(54, 63, 74, 0.53);
`;

const SentimentWrapper = styled.div`
  margin: 10px;
  display: flex;
  justify-content: space-around;
  margin-top: 3rem;
  padding: 0.75rem;
  border-radius: 8px;
  background-color: rgba(255, 252, 246, 0.79);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  border: 1px solid rgb(183, 183, 183);
`;

const SentimentItem = styled.div`
  text-align: center;
`;

const SentimentLabel = styled.div`
  font-size: 0.75rem;
  color: #363f4a;
  margin-bottom: 0.25rem;
`;

const SentimentValue = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: #ceeaff;
`;

export default App;
