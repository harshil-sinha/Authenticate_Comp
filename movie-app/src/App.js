import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';
import Watchlist from './components/Watchlist';
import MovieDetails from './components/MovieDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(localStorage.getItem('user') || null);

  const handleLogin = (email) => {
    setUser(email);
    localStorage.setItem('user', email);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/search" element={user ? <Search /> : <Navigate to="/login" />} />
          <Route path="/watchlist" element={user ? <Watchlist user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
