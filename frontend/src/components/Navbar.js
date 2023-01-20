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
    <div className="container">
      <Link id="logo" to="/">
        <h1>Blog-City</h1>
      </Link>
      <nav>
        <div className="actions">
          <button onClick={handleLogout}>Logout</button>
          <Users />
          <Link to="/add-post">Add Post</Link>
          <Link to="/userBlog">My Blogs</Link>
          <Link to="/users">List of users</Link>
        </div>
      </nav>
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
      console.log(json);
      json.filter((fName) => {
        if (user.email === fName.email) {
          console.log(fName.name);
          setName(fName.name);
        }
        return fName;
      });
    };
    if (user) {
      fetchUsers();
    }
  }, [user]);

  return <h2>{name}</h2>;
};

export default Navbar;
