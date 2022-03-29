import { Avatar } from 'components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';

const Header = () => {
  const navigate = useNavigate();

  const goHome = (replace: boolean = false) => {
    navigate('/', { replace });
  };
  return (
    <div className='header'>
      <div className='header__left'>
        <div className='header__logo' onClick={() => goHome()}></div>
        <div className='header__title'>Application</div>
      </div>
      <div className='header__right'>
        <Avatar />
      </div>
    </div>
  );
};

export default Header;
