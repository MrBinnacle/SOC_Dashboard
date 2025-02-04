import React from 'react';
import Dashboard from './components/Dashboard';
import ExecutiveSummary from './components/ExecutiveSummary';
import ThreatPrioritization from './components/ThreatPrioritization';
import DeepfakeDetection from './components/DeepfakeDetection';

const App = () => {
  return (
    <div>
      <Dashboard />
      <ExecutiveSummary />
      <ThreatPrioritization />
      <DeepfakeDetection />
    </div>
  );
};

export default App;
