import React from 'react';
import styled from 'styled-components';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #373A40;
  padding: 0.5rem 1rem;  /* Adjust side padding as needed */
  border-bottom: 1px solid #4b5563;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const LogoContainer = styled.div`
  //margin-left: 1rem;
  gap: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HomeIcon = styled(Home)`
  color: #ceeaff;
  // margin-left: 1rem;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

const Logo = styled.div`
  margin-left: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: rgb(236, 233, 229);
`;

const TabsContainer = styled.nav`
  display: flex;
  justify-content: flex-end;
`;

const Tab = styled.div`
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  color: rgb(192, 204, 225);
  cursor: pointer;
  border-bottom: ${({ active }) => (active ? '2px solid #ceeaff' : '2px solid transparent')};
  transition: border-bottom 0.3s ease, color 0.3s ease;

  &:hover {
    color: white;
  }
`;

const HeaderComponent = ({ activeTab, onTabClick }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <HeaderContainer>
      <LogoContainer>
        <HomeIcon size={24} onClick={() => handleNavigation('/')} />
        <Logo>Election Sentiment</Logo>
      </LogoContainer>
      <TabsContainer>
        <Tab active={activeTab === 'prediction'} onClick={() => onTabClick('/election-prediction')}>
          Election Prediction
        </Tab>
        <Tab active={activeTab === 'analysis'} onClick={() => onTabClick('/election-analysis')}>
          Election Analysis
        </Tab>
      </TabsContainer>
    </HeaderContainer>
  );
};

export default HeaderComponent;
