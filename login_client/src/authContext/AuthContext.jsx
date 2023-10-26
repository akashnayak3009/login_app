// AuthContext.js
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  // const login = (newToken) => {
  //   setToken(newToken);
  // };


  // const logout = () => {
  //   setToken(null);
  // };

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
  };
  
  // When the page loads, check if a token is stored in localStorage
  // and set it as the initial token value
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  
  const userAuthId=(id)=>{  
      setUserId(id);
  }

  return (
    <AuthContext.Provider value={{ token, login, logout,userAuthId, userId,isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};
