import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
const Navbar = () => {
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="container">
      <Link id="logo" to="/">
        <h1>Blog-City</h1>
      </Link>
      <nav>
        <div className="actions">
          <button onClick={handleLogout}>Logout</button>
          <Link to="/add-post">Add Post</Link>
          <Link to="/userBlog">My Blogs</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
