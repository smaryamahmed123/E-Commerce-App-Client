// import React from 'react';
// import { Outlet, Navigate, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const PrivateRoute = () => {
//   const { isAuthenticated } = useSelector((state) => state.auth);
//   const location = useLocation();

//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} />;
// };

// export default PrivateRoute;





// PrivateRoute.js
import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ isAdminRoute = false }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();
  const isAdmin = true; 
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // if (isAdminRoute && (!user || user.role !== 'admin')) {
  //   return <Navigate to="/" />;
  // }

  if (isAdminRoute && !isAdmin) {
    return <Navigate to="/not-authorized" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
