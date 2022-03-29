import React from 'react';
import { auth } from 'config/firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const AuthLogout = () => {
  const { signOut } = useAuth();

  const navigate = useNavigate();

  const signOutUser = () => {
    signOut()
      .then(() => navigate('/login', { replace: true }))
      .catch((error) => {
        console.error(`Error signing out: ${error.message}`);
      });
  };

  return (
    <div>
      <div>AuthLogout</div>
      <p>Are you sure you want to log out?</p>
      <button onClick={() => navigate(-1)} className='cancel'>
        Cancel
      </button>
      <button onClick={() => signOutUser()} className='sign-out'>
        Sign Out
      </button>
    </div>
  );
};
