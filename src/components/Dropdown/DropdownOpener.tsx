import React from 'react';
import './dropdown.css';

export const DropdownOpener = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  return <div className='dropdown-opener'>{children}</div>;
};
