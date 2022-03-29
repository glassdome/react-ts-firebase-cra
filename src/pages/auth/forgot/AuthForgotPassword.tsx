import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthForm, ErrorText } from 'components';
import { useAuth } from '../hooks/useAuth';

export const AuthForgotPassword = () => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const { sendResetEmail } = useAuth();

  const changePasswordRequest = () => {
    if (error !== '') setError('');

    setSending(true);
    sendResetEmail(email)
      .then(() => {
        console.log(`Reset email sent to ${email}`);
        setSent(true);
        setSending(false);
      })
      .catch((error) => {
        const message = `Error sending reset to ${email}: ${error.message}`;
        console.error();
        setError(message);
        setSending(false);
      });
  };

  return (
    <AuthForm title='Forgot Password'>
      {sent ? (
        <div>
          <p>{`Reset link has been sent to ${email}`}</p>
          <p>
            Sign in <Link to='/login'>here</Link> after reset.
          </p>
        </div>
      ) : (
        <>
          <div className='input-underline'>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Email'
              value={email}
              className='text-input'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            className='button'
            disabled={sending}
            onClick={() => changePasswordRequest()}
          >
            Send Reset Link
          </button>
          <ErrorText error={error} />
        </>
      )}
    </AuthForm>
  );
};
