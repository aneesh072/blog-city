import { fontWeight } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link id="logo" to="/">
          <h1>Blog-City</h1>
        </Link>
        <nav>
          <div className="actions">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
