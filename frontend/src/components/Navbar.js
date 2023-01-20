import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
const Navbar = () => {
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div class="nav">
      <input type="checkbox" id="nav-check" />

      <div class="nav-title">
        <Link to="/">Blog City</Link>{' '}
      </div>

      <div class="nav-btn">
        <label for="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div class="nav-links">
        <Users />
        <Link to="/add-post">Add Post</Link>
        <Link to="/userBlog">My Blogs</Link>

        <Link onClick={handleLogout}>Logout</Link>
      </div>
    </div>
  );
};

const Users = () => {
  const { user } = useAuthContext();
  const [name, setName] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/user/users', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      json.filter((fName) => {
        if (user.email === fName.email) {
          setName(fName.name);
        }
        return fName;
      });
    };
    if (user) {
      fetchUsers();
    }
  }, [user]);

  return <h2 style={{ color: '#cf79dc', fontSize: '28px' }}>{name}</h2>;
};

export default Navbar;
