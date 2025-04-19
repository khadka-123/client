import React from 'react';
import styled from 'styled-components';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: #373A40;
  padding: 1.5rem 0;
  border-bottom: 1px solid #4b5563;
`;

const LogoContainer = styled.div`
gap:0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HomeIcon = styled(Home)`
  color: #ceeaff;
  margin-left: 1rem;
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



const HeaderComponent = ({ activeTab, onTabClick }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <HeaderContainer>
      <LogoContainer>
        <HomeIcon size={24} onClick={() => handleNavigation('/')} />
        <Logo>Influential Leader</Logo>
      </LogoContainer>
      
    </HeaderContainer>
  );
};

export default HeaderComponent;
