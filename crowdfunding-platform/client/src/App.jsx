// src/App.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CampaignDetail from './pages/CampaignDetail.jsx';
import CreateCampaign from './pages/CreateCampaign.jsx';
import About from './pages/About.jsx';
import ContactUs from './pages/ContactUs.jsx';
import Logout from './pages/Logout.jsx';


export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
  }, []);

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn}/>} />
        <Route path="/campaign/:id" element={<CampaignDetail isLoggedIn={isLoggedIn} />} />
        <Route path="/create" element={<CreateCampaign isLoggedIn={isLoggedIn} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
