import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVoteYea, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

// FeatureCard component
const FeatureCard = ({ title, icon, onClick }) => (
  <FeatureCardContainer onClick={onClick}>
    <FeatureCardContent>
      <FeatureTitle>{title}</FeatureTitle>
      <FeatureIcon>{icon}</FeatureIcon>
    </FeatureCardContent>
  </FeatureCardContainer>
);

// Dashboard component
const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

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
      </Main>
    </DashboardContainer>
  );
};

export default Dashboard;

// Styled components
const DashboardContainer = styled.div`
  min-height: 100vh;
  background-image: url('/images/bg1.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
`;

const Header = styled.header`
  background-color: rgba(55, 58, 64, 0.9);
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 768px) {
    padding: 1.5rem 2rem;
  }
`;

const MenuButton = styled.button`
  color: #9ca3af;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: white;
  }
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Spacer = styled.div`
  width: 32px;
`;

const Main = styled.main`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;

  @media (min-width: 768px) {
    margin-top: 6rem;
    padding: 2rem;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto 4rem;
  gap: 4rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
    justify-items: center;
    gap: 4rem;
  }
`;

const FeatureCardContainer = styled.div`
  background-color: rgba(55, 58, 64, 0.9);
  border-radius: 8px;
  padding: 4rem;
  padding-left: 2rem;
  width: 100%;
  max-width: 600px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    cursor: pointer;
    transform: scale(1.03);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureCardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const FeatureIcon = styled.div`
  color: rgb(232, 232, 232);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
`;

const DividerDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: white;
  margin: 0 6px;
`;
