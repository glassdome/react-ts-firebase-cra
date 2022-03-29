import React from 'react';
import './dropdown.css';

type DropdownProps = {
  children: React.ReactNode;
};
export const Dropdown = ({ children }: DropdownProps) => {
  return <ul className='dropdown'>{children}</ul>;
};
