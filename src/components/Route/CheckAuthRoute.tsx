import { FunctionComponent } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const CheckAuthRoute: FunctionComponent = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) return <Navigate to={'/todo'} replace />;
  return <Outlet />;
};

export default CheckAuthRoute;
