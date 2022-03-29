import React from 'react';
import './dropdown.css';

interface DropdownProps<T> {
  label: string;
  data: T;
  onClick: (data: T) => void;
}
export const DropdownItem = <T,>({
  label,
  data,
  onClick,
}: DropdownProps<T>) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onClick(data);
  };

  return (
    <div className='dropdown__item' onClick={(e) => handleClick(e)}>
      <span>{label}</span>
    </div>
  );
};
