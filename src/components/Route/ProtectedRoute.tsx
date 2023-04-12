import { FunctionComponent } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: FunctionComponent = () => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) return <Navigate to={'/signin'} replace />;

  return <Outlet />;
};

export default ProtectedRoute;
