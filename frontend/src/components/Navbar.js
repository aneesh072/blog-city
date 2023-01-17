import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
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
  );
};

export default Navbar;
