import React from 'react';
import { Navigate } from 'react-router-dom';


function PrivateRoute({children}) {
  
  const token=localStorage.getItem("jwtToken");
  return token ? children : <Navigate to="/auth/login" replace />;
}

export default PrivateRoute;
