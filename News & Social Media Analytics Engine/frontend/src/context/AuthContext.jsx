import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('newsiq_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email, password) => {
    // Mock login that always succeeds
    const mockUser = {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex@newsiq.io',
      username: 'alexj',
      avatar: null,
      role: 'analyst',
      joinedAt: '2025-01-15'
    };
    localStorage.setItem('newsiq_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const register = (name, email, username, password) => {
    // Mock register that automatically logs in
    login(email, password);
  };

  const logout = () => {
    localStorage.removeItem('newsiq_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
