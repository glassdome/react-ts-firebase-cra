import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ErrorText } from 'components';
import { useAuth } from '../hooks/useAuth';

export const AuthResetPassword = () => {
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [changing, setChanging] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [oobCode, setOobCode] = useState('');
  const [error, setError] = useState('');

  const { confirmReset, verifyResetCode } = useAuth();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams && searchParams.has('oobCode')) {
      verifyResetLink(searchParams.get('oobCode')!);
    } else {
      console.error(
        `Error verifying OOB code. Params: ${JSON.stringify(searchParams)}`
      );
      setVerified(false);
      setVerifying(false);
    }
  }, [searchParams]);

  /*
   * This runs when the page loads - check that we have a valid oob code in the link.
   */
  const verifyResetLink = (_oobCode: string) => {
    verifyResetCode(_oobCode)
      .then((result) => {
        console.log('Verified OOB Code');
        setOobCode(_oobCode);
        setVerified(true);
        setVerifying(false);
      })
      .catch((error) => {
        console.error(`Unable to verify OOB Code: ${error.message}`);
        setVerified(false);
        setVerifying(false);
      });
  };

  /*
   * This is the last step in the reset.
   */
  const resetPassword = () => {
    if (error !== '') setError('');
    if (confirm !== oldPassword) {
      setError('Passwords do not match.');
      return;
    }

    setChanging(true);

    confirmReset(oobCode, confirm)
      .then(() => {
        console.log('Password reset confirmed.');
        navigate('/login', { replace: true });
      })
      .catch((error) => {
        const message = `Could not confirm password reset: ${error.message}`;
        console.error(message);
        setChanging(false);
      });
  };

  const renderReset = () => {
    if (!verified) return <h2>Not Verified</h2>;
    return (
      <>
        <p>Please enter a strong password.</p>
        <div className='form-change-password auth-form stack'>
          <input
            autoComplete='off'
            type='password'
            name='password'
            id='password'
            placeholder='New Password'
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            autoComplete='off'
            type='password'
            name='confirm'
            id='confirm'
            placeholder='Confirm New Password'
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <button disabled={changing} onClick={() => resetPassword()}>
            Reset Password
          </button>
          <ErrorText error={error} />
        </div>
      </>
    );
  };

  return (
    <div className='center-wrap stack'>
      <h1>Reset Password</h1>
      {verifying ? <h2>Loading...</h2> : renderReset()}
    </div>
  );
};
