import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div>
      <h1>Homepage</h1>
      <p>Welcome to the homepage!</p>
      <p>
        You can change your password <Link to='/change'>here</Link>
      </p>
      <p>
        You can sign out <Link to='/logout'>here</Link>
      </p>
    </div>
  );
};
