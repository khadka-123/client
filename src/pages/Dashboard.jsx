import React, { useState } from 'react';
import { Menu, Twitter } from 'lucide-react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVoteYea, faGlobe } from '@fortawesome/free-solid-svg-icons';
import {  useNavigate } from 'react-router-dom';

// FeatureCard component
const FeatureCard = ({ title, icon, onClick }) => (
  <FeatureCardContainer onClick={onClick}>
    <FeatureCardContent>
      <FeatureTitle>{title}</FeatureTitle>
      <FeatureIcon>{icon}</FeatureIcon>
    </FeatureCardContent>
  </FeatureCardContainer>
);

// Tweet component
const Tweet = ({ image }) => (
  <TweetContainer>
    {image && (
      <TweetImageContainer>
        <TweetImage src={image} alt="Tweet content" />
      </TweetImageContainer>
    )}
  </TweetContainer>
);

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const randomTweetImage = () => `/images/tweet${Math.floor(Math.random() * 10) % 3 + 1}.png`;

  const trendingTweets = [
    { id: 1, image: randomTweetImage() },
    { id: 2, image: randomTweetImage() },
  ];

  const navigateTo = (url) => {
    navigate(url);
  };

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
            onClick={() => navigateTo('./election-prediction')}
          />
          <FeatureCard
            title="World Leader Sentiments"
            icon={<FontAwesomeIcon icon={faGlobe} size="4x" />}
            onClick={() => navigateTo('./world-leader-sentiment')}
          />
        </FeatureGrid>
        <Divider>
          <DividerDot />
          <DividerDot />
          <DividerDot />
        </Divider>
        <TrendingSection>
          <SectionHeader>
            <SectionSubtitle>Trending Tweets</SectionSubtitle>
            <StyledTwitterIcon size={28} />
          </SectionHeader>
          <TweetsGrid>
            {trendingTweets.map((tweet) => (
              <Tweet key={tweet.id} {...tweet} />
            ))}
          </TweetsGrid>
        </TrendingSection>
      </Main>
    </DashboardContainer>
  );
};

// Styled components for Dashboard

const DashboardContainer = styled.div`
  min-height: 100vh;
  background-image: url('/images/bg1.jpg');
  background-size: cover;
  ${'' /* background-color: rgba(0, 0, 0, 0.4); 
  background-blend-mode: overlay;  */}
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
`;

const Header = styled.header`
  background-color: rgba(55, 58, 64, 0.9);
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MenuButton = styled.button`
  color: #9ca3af;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
`;

const Spacer = styled.div`
  width: 32px;
`;

const Main = styled.main`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  margin-bottom: 64px;
`;

const FeatureCardContainer = styled.div`
  background-color: rgba(55, 58, 64, 0.9);
  border-radius: 8px;
  padding: 30px;
  margin: 10px;
  height: 100%;
  width: 600px;
  transition: transform 0.3s ease;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const FeatureCardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const FeatureTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0;
`;

const FeatureIcon = styled.div`
  color:rgb(232, 232, 232);
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 32px 0;
`;

const DividerDot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color:rgb(255, 255, 255);
  margin: 0 4px;
`;

const TrendingSection = styled.div`
  background-color: rgb(55, 58, 64, 0.9);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  margin-top: 10px;
  width: 1400px;
  max-height: 300px;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const SectionSubtitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0;
`;

const StyledTwitterIcon = styled(Twitter)`
  margin-left: 8px;
  color: #9ca3af;
`;

const TweetsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const TweetContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  color: #1f2937;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  max-width: 100%;
`;

const TweetImageContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

const TweetImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain;
  border-radius: 8px;
`;

export default Dashboard;
