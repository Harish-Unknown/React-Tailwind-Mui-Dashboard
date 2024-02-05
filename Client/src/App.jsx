import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Country from './components/Country';
import Intensity from './components/Intensity';
import PestFactorsDistribution from './components/PestFactorsDistribution';
import Likelihood from './components/Likelihood';
import Dashboard from './Pages/Dashboard';

function App() {

  return (
    <Router>
    <Routes>
      <Route exact path="/" element={<Dashboard />} />
      <Route exact path="/country" element={<Country />} />
      <Route exact path="/intensity" element={<Intensity />} />
      <Route exact path="/pestfactorsdistribution" element={<PestFactorsDistribution />} />
      <Route exact path="/likelihood" element={<Likelihood />} />
    </Routes>
  </Router>
  )
}

export default App
