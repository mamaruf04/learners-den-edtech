import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { checkUserRole } from './CheckUserRole';

const AdminRoute = ({ children }) => {
    const currentUser = useSelector((state) => state.auth.user);
    if (!checkUserRole(currentUser, "admin")) {
      return <Navigate to="/" />;
    }
    return children;
  };

export default AdminRoute;