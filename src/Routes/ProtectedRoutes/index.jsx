// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = () => {
//   return localStorage.getItem("uid") ? <Outlet /> : <Navigate to={"/"} />;
// };

// export default ProtectedRoute;




import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
