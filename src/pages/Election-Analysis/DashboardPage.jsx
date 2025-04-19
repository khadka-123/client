import React, { useState } from "react";
import ElectionDashboard from "./ElectionDashboard";
import "../../assets/Election-Analysis-Styles/DashboardPage.css";
import HeaderComponent from "../../components/HeaderComponent";
import { useNavigate, useLocation } from 'react-router-dom';

const DashboardPage = () => {
  const [selectedParty, setSelectedParty] = useState("INCIndia");

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const activeTab = location.pathname === '/election-analysis' ? 'analysis' : 'prediction';

  return (
    <>
    <HeaderComponent activeTab={activeTab} onTabClick={handleNavigation} />
    <div className="dashboard-page">
      <h2>Select a Party</h2>
      <div className="party-buttons">
        <button
          onClick={() => setSelectedParty("INCIndia")}
          className={`congress ${selectedParty === "INCIndia" ? "active" : ""}`}
        >
          Congress
        </button>
        <button
          onClick={() => setSelectedParty("BJP4India")}
          className={`bjp ${selectedParty === "BJP4India" ? "active" : ""}`}
        >
          BJP
        </button>
        <button
          onClick={() => setSelectedParty("AamAadmiParty")}
          className={`aap ${selectedParty === "AamAadmiParty" ? "active" : ""}`}
        >
          AAP
        </button>
      </div>
      <ElectionDashboard party={selectedParty} />
    </div>
    </>
  );
};

export default DashboardPage;
