import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { checkUserRole } from './CheckUserRole';

const StudentRoute = ({ children }) => {
    const currentUser = useSelector((state) => state.auth.user);
    if (!checkUserRole(currentUser, "student")) {
      return <Navigate to="/" />;
    }
    return children;
  };

export default StudentRoute;