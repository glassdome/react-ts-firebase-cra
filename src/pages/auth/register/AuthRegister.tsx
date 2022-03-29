import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthForm, ErrorText } from 'components';
import { useAuth } from '../hooks/useAuth';

export const AuthRegister = () => {
  const [registering, setRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { register } = useAuth();

  const signupWithEmailAndPassword = () => {
    if (password !== confirm) setError('Passwords do not match.');
    if (error !== '') setError('');

    setRegistering(true);

    register(email, password)
      .then((user) => {
        console.log(`User created: ${user.user.email}`);
        navigate('/', { replace: true });
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setRegistering(false);
      });
  };

  return (
    <AuthForm title={'Sign Up'}>
      <div className='input-underline'>
        <input
          autoComplete='email'
          type='email'
          name='email'
          id='email'
          placeholder='Email Address'
          value={email}
          className='text-input'
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='input-underline'>
        <input
          autoComplete='new-password'
          type='password'
          name='password'
          id='password'
          placeholder='Password'
          value={password}
          className='text-input'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='input-underline'>
        <input
          autoComplete='new-password'
          type='password'
          name='confirm'
          id='confirm'
          placeholder='Confirm Password'
          value={confirm}
          className='text-input'
          onChange={(e) => setConfirm(e.target.value)}
        />
      </div>
      <button
        className='button'
        disabled={registering}
        onClick={() => signupWithEmailAndPassword()}
      >
        Sign Up!
      </button>
      <p>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
      <ErrorText error={error} />
    </AuthForm>
  );
};
