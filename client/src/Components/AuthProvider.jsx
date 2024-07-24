import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const fetchUserData = async (token) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/account/user-detail', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? { isAuthenticated: true, token } : null;
  });
  const [username, setUsername] = useState('');

  const login = async (token) => {
    localStorage.setItem('token', token);
    const userData = await fetchUserData(token);
    setUser({ isAuthenticated: true, token });
    setUsername(userData.username);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setUsername('');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token).then(userData => {
        if (userData) {
          setUser({ isAuthenticated: true, token });
          setUsername(userData);
        }
      });
    }
  }, []);

  const value = {
    user,
    username,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
