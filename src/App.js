import Dashboard from "./pages/Dashboard";
import ElectionPrediction from './pages/Election-Prediction/election-prediction';
import WorldLeader from './pages/World-Leader-Sentiment/world-leader-sentiment';
import DashboardPage from './pages/Election-Analysis/DashboardPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/election-prediction" element={<ElectionPrediction />} />
      <Route path="/world-leader-sentiment" element={<WorldLeader />} />
      <Route path="/election-analysis" element={<DashboardPage />} />

    </Routes>
  </Router>
  );
}

export default App;