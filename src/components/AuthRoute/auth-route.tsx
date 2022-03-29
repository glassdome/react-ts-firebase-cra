import React from 'react';
import { auth } from 'config/firebase';
import { Navigate } from 'react-router-dom';

export const AuthRoute = ({ children }: React.PropsWithChildren<unknown>) => {
  if (!auth.currentUser) {
    console.log('No user found. Redirecting...');
    return <Navigate to={'/login'} />;
  }
  return <div>{children}</div>;
};
