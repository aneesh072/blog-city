import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

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
        return setName(fName.name);
      });
    };
    if (user) {
      fetchUsers();
    }
  }, [user]);

  console.log(name);

  return <div>Users</div>;
};

export default Users;
