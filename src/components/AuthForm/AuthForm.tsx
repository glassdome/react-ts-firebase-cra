import React from 'react';
import './auth-form.css';

interface AuthFormProps {
  title: string;
}
export const AuthForm = ({
  title,
  children,
}: React.PropsWithChildren<AuthFormProps>) => {
  return (
    <form className='auth-form stack center'>
      <div className='auth-form__title'>{title}</div>
      <div className='auth-form__body stack'>{children}</div>
    </form>
  );
};
