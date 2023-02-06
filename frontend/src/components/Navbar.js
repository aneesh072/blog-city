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
    <div className="nav">
      <input type="checkbox" id="nav-check" />

      <div className="nav-title">
        <Link to="/">Blog City</Link>{' '}
      </div>

      <div className="nav-btn">
        <label htmlFor="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div className="nav-links">
        <Users />
        <Link to="/add-post">Add Post</Link>
        <Link to="/userBlog">My Blogs</Link>

        <Link onClick={handleLogout} style={{border: '2px solid green'}}>Logout</Link>
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

  return (
    <h2
      style={{
        color: 'white',
        fontSize: '28px',
        background: 'gray',
        padding: '13px',
        borderRadius: '40px',
      }}
    >
      Hello {name}
    </h2>
  );
};

export default Navbar;
