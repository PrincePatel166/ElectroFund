
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App'; 

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); 

  useEffect(() => {
    logout();
    window.location.reload();
    navigate('/login'); 
  }, [logout, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-xl font-bold">Logging you out...</h1>
    </div>
  );
};

export default Logout;
