import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVoteYea, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';

// FeatureCard component
const FeatureCard = ({ title, icon, onClick }) => (
  <FeatureCardContainer onClick={onClick}>
    <FeatureCardContent>
      <FeatureTitle>{title}</FeatureTitle>
      <FeatureIcon>{icon}</FeatureIcon>
    </FeatureCardContent>
  </FeatureCardContainer>
);

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [aggregatedData, setAggregatedData] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetch('http://localhost:5000/api/election_prediction')
  //     .then((res) => res.json())
  //     .then((data) => setAggregatedData(
  //       // Expect data as array of objects with Datetime and total_tweets
  //       Array.isArray(data) ? data : []
  //     ))
  //     .catch((error) => console.error('Error fetching aggregated data:', error));
  // }, []);

  const navigateTo = (url) => navigate(url);

  return (
    <DashboardContainer>
      <Header>
        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu size={32} />
        </MenuButton>
        <Title>Twitter Sentiment Analysis</Title>
        <Spacer />
      </Header>
      <Main>
        <FeatureGrid>
          <FeatureCard
            title="Election Sentiments"
            icon={<FontAwesomeIcon icon={faVoteYea} size="4x" />}
            onClick={() => navigateTo('/election-prediction')}
          />
          <FeatureCard
            title="World Leader Sentiments"
            icon={<FontAwesomeIcon icon={faGlobe} size="4x" />}
            onClick={() => navigateTo('/world-leader-sentiment')}
          />
        </FeatureGrid>
        <Divider>
          <DividerDot />
          <DividerDot />
          <DividerDot />
        </Divider>
        {/* <TrendingSection>
          <SectionHeader>
            <SectionSubtitle>Tweet Volume Over Time</SectionSubtitle>
          </SectionHeader>
          <ChartContainer>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={aggregatedData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Datetime" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total_tweets" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </TrendingSection> */}
      </Main>
    </DashboardContainer>
  );
};

// Styled components
const DashboardContainer = styled.div`
  
  min-height: 100vh;
  background-image: url('/images/bg1.jpg');
  background-size: cover;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
`;
const Header = styled.header`
  background-color: rgba(55,58,64,0.9);
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const MenuButton = styled.button`
  color: #9ca3af;
  background: none;
  border: none;
  cursor: pointer;
  &:hover { color: white; }
`;
const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;
const Spacer = styled.div`width: 32px;`;
const Main = styled.main`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6rem;
`;
const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 4rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2,1fr);
    gap: 6rem;
  }
`;
const FeatureCardContainer = styled.div`
  background-color: rgba(55,58,64,0.9);
  border-radius: 8px;
  padding: 2rem;
  transition: transform 0.3s;
  width: 100%; max-width: 500px;
  &:hover { cursor: pointer; transform: scale(1.03); }
`;
const FeatureCardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0;
`;
const FeatureIcon = styled.div`color: rgb(232,232,232);`;
const Divider = styled.div`
  display: flex; align-items: center; justify-content: center; margin: 2rem 0;
`;
const DividerDot = styled.div`
  width:6px; height:6px; border-radius:50%; background:white; margin:0 6px;
`;

// const TrendingSection = styled.div`
//   background-color: rgba(55,58,64,0.9);
//   border-radius:8px; padding:1rem;
//   width:100%; max-width:1200px;
// `;

// const SectionHeader = styled.div`
//   display:flex; align-items:center; margin-bottom:1rem;
// `;
// const SectionSubtitle = styled.h3`
//   font-size:1.25rem; font-weight:500; margin:0;
// `;
// const ChartContainer = styled.div`
//   width:100%; height:300px;
// `;
export default Dashboard;
