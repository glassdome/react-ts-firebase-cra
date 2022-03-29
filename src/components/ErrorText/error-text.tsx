import React from 'react';

interface ErrorTextProps {
  error: string;
}
export const ErrorText = ({ error }: ErrorTextProps) => {
  return <div className='error-text'>{error}</div>;
};
