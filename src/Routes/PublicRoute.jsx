// src/routes/PublicRoute.js
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = () => {
  const user = useSelector((state) => state.user.userInfo);
  return user ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
