import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import LandingPage from './pages/public/LandingPage';
import PlayerDashboard from './pages/player/PlayerDashboard';
import TodaysWorkout from './pages/player/TodaysWorkout';
import AdminDashboard from './pages/admin/AdminDashboard';
import WorkoutBuilder from './pages/admin/WorkoutBuilder';

// Route Guard for Players
const PlayerRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// Route Guard for Coach
const CoachRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || (user.role !== 'coach' && user.role !== 'admin')) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Player Space */}
          <Route path="/dashboard" element={<PlayerRoute><PlayerDashboard /></PlayerRoute>} />
          <Route path="/dashboard/workout/today" element={<PlayerRoute><TodaysWorkout /></PlayerRoute>} />

          {/* Coach Space */}
          <Route path="/admin" element={<CoachRoute><AdminDashboard /></CoachRoute>} />
          <Route path="/admin/workout-builder" element={<CoachRoute><WorkoutBuilder /></CoachRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
