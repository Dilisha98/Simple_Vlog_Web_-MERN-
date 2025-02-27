// AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = () => {
    setLoading(true);
    fetch("http://localhost:5000/profile", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((userInfo) => {
        if (userInfo && userInfo.username) {
          setUsername(userInfo.username);
        } else {
          setUsername(null);
        }
      })
      .catch(() => setUsername(null))
      .finally(() => setLoading(false));
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const login = async (username, password) => {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include'
    });
    
    if (response.ok) {
      fetchProfile(); // Update auth state after login
      return true;
    }
    return false;
  };

  const logout = async () => {
    const response = await fetch('http://localhost:5000/logout', {
      method: 'POST',
      credentials: 'include'
    });
    
    if (response.ok) {
      setUsername(null);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ username, login, logout, fetchProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);