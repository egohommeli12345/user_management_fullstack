import { useState, useEffect } from 'react';
import './UserManagement.css';
import { User } from '../interfaces';

const fetchUsers = async () => {
  const response = await fetch('http://localhost:8080/users');
  const data = await response.json();
  return data;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers().then((data) => {
      console.log(data);
      setUsers(data);
    }).catch((error) => {
      console.log(error);
    });
  }, [])

  return (
    <div className="usermanagementbg">
      <div className="usermanagementheader">
        <h1>User Management</h1>
      </div>
      <div className="userlist">
        <ul>
          {users.map((user) => (
            <li className="listitem" key={user.id}>
              <div className="user">
                <div className="title0">UserID:</div>
                <div className="data0">{user.id}</div>
                <div className="title1">Username:</div>
                <div className="data1">{user.username}</div>
                <div className="title2">Email:</div>
                <div className="data2">{user.email}</div>
                <div className="title3">Password:</div>
                <div className="data3">{user.password}</div>
                <button className="userdel">Delete user</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
