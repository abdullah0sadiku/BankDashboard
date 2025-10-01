import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Homepage1 from './Homepage1';
import Homepage2 from './Homepage2';
import Bank from './Bank';

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

  // Protected route wrapper component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!user) {
      return <Login onLogin={handleLogin} />;
    }
    return <>{children}</>;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Route - No Authentication Required */}
          <Route path="/bank" element={<Bank />} />
          
          {/* Protected Routes - Authentication Required */}
          <Route 
            path="/homepage1" 
            element={
              <ProtectedRoute>
                <Homepage1 user={user!} onLogout={handleLogout} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/v2/homepage1" 
            element={
              <ProtectedRoute>
                <Homepage2 user={user!} onLogout={handleLogout} />
              </ProtectedRoute>
            } 
          />
          
          {/* Default Routes */}
          <Route path="/" element={<Navigate to="/bank" replace />} />
          <Route path="/testing" element={<Navigate to="/bank" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 