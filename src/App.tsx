import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Homepage1 from './Homepage1';
import Homepage2 from './Homepage2';
import Dashboard from './Dashboard';

interface User {
  name: string;
  type: string;
  balance: number;
  cards: number;
  accountNumber: string;
  email: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/homepage1" element={<Homepage1 user={user} onLogout={handleLogout} />} />
          <Route path="/homepage2" element={<Homepage2 user={user} onLogout={handleLogout} />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 