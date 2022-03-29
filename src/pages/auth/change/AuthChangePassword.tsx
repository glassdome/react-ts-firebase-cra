import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { auth } from 'config/firebase';
import { AuthForm, ErrorText } from 'components';
import { useAuth } from '../hooks/useAuth';

export const AuthChangePassword = () => {
  const [changing, setChanging] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const { changePassword } = useAuth();
  const navigate = useNavigate();

  const updatePassword = () => {
    if (error !== '') setError('');
    if (confirm !== newPassword) {
      setError('Passwords do not match.');
      return;
    }

    setChanging(true);

    // updatePassword(auth.currentUser!, newPassword)
    changePassword(auth.currentUser!, newPassword)
      .then((result) => {
        console.log(`User ${auth.currentUser!.email} changed password.`);
        navigate('/', { replace: true });
      })
      .catch((error) => {
        console.error(`Error changing password: ${error.message}`);
        setChanging(false);
      });
  };

  /*
   * Ensure currentUser is logged in with a password before proceeding.
   * If they're logged in via some other provider there's nothing to do.
   */
  if (auth.currentUser?.providerData[0].providerId !== 'password') {
    return <Navigate to='/' />;
  }

  return (
    <AuthForm title='Change Password'>
      <div className='input-underline'>
        <input
          type='password'
          name='oldPassword'
          id='oldPassword'
          placeholder='Current Password'
          value={oldPassword}
          className='text-input'
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div className='input-underline'>
        <input
          autoComplete='off'
          type='password'
          name='password'
          id='password'
          placeholder='New Password'
          value={newPassword}
          className='text-input'
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className='input-underline'>
        <input
          autoComplete='off'
          type='password'
          name='confirm'
          id='confirm'
          placeholder='Confirm New Password'
          value={confirm}
          className='text-input'
          onChange={(e) => setConfirm(e.target.value)}
        />
      </div>
      <button
        className='button'
        disabled={changing}
        onClick={() => updatePassword()}
      >
        Submit
      </button>
      <ErrorText error={error} />
    </AuthForm>
  );
};
