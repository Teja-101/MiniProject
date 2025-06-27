import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ImageGenerator from './components/img-generator/ImageGenerator';
import LoginPage from './components/LoginPage';
import './App.css';

function App() {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  return (
    <Router>
      <Routes>
        {/* Start at login page */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected image generation */}
        <Route
          path="/generate"
          element={isLoggedIn ? <ImageGenerator /> : <Navigate to="/login" />}
        />

        {/* Catch-all: any unknown path → login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
