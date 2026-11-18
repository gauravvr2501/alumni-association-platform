import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';

import Jobs from './pages/Jobs';
import Events from './pages/Events';
import Donations from './pages/Donations'
import SuccessStories from './pages/SuccessStories';
import NetworkingHub from './pages/NetworkingHub';
import ManageAlumni from "./pages/ManageAlumni";
import ManageJobs from "./pages/ManageJobs"; // ✅ Import ManageJobs



// Wrap Routes with a component that can access `useLocation`
function AppContent() {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} /> {/* 👈 Admin Route */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/donation" element={<Donations />} />
        <Route path="/events" element={<Events/>}/>
        <Route path="/jobs" element={<Jobs/>}/>
        <Route path="/networking" element={<NetworkingHub />} />
        <Route path="/admin/manage-jobs" element={<ManageJobs />} />
        <Route path="/admin/manage-alumni" element={<ManageAlumni />} />
        <Route path="/success-stories" element={<SuccessStories />} />
        
      </Routes>

      {/* ✅ Render footer only on home page */}
      {location.pathname === '/' && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
