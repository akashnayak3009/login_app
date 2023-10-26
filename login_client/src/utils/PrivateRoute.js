import React from 'react';
import { Navigate, } from 'react-router-dom';
import { useAuth } from '../authContext/AuthContext';
import UpdateForm from '../components/UpdateForm';
import AdminDashboard from '../pages/AdminDashboard';
import UserDashboard from '../pages/UserDashboard';



export function PrivateRoute({ element, path}) {
  const { isAuthenticated } = useAuth();
    return isAuthenticated ? (
      <AdminDashboard/> 
    ) : (
      <Navigate to="/login" />
    );
  }

  export function PrivateRoute1({ element, path}) {
    const { isAuthenticated } = useAuth();
      return isAuthenticated ? (
        <UserDashboard/> 
      ) : (
        <Navigate to="/login" />
      );
    }

  export function ProtectRoute({ element, path}) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? (
       <UpdateForm/>
    ) : (
      <Navigate to="/login" />
    );
  }