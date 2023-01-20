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

  return <div>{name}</div>;
};

export default Users;
