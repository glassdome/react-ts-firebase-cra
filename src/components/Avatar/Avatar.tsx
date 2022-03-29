import React from 'react';
import './avatar.css';
import { Dropdown, DropdownItem, DropdownOpener } from 'components/Dropdown';
import { useAuth } from 'pages/auth';
import { useNavigate } from 'react-router-dom';

type AvatarProps = {
  text?: string;
};
export const Avatar = ({ text }: AvatarProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const signOutUser = () => {
    signOut()
      .then(() => navigate('/login', { replace: true }))
      .catch((error) => {
        console.error(`Error signing out: ${error.message}`);
      });
  };

  const getDisplayText = () => {
    if (text !== undefined) return text;

    return user?.displayName
      ? user.displayName[0].toUpperCase()
      : user!.email![0].toUpperCase();
  };

  const renderAvatar = () => {
    return (
      <DropdownOpener>
        <div className='avatar' aria-label='' role='menu'>
          <Dropdown>
            <DropdownItem
              label='Sign Out'
              data={user}
              onClick={() => signOutUser()}
            />
          </Dropdown>
          <span className='avatar__text'>{getDisplayText()}</span>
        </div>
      </DropdownOpener>
    );
  };
  return user ? renderAvatar() : <p>Sign In</p>;
};
