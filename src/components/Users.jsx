import '../styles/User.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

function User() {
  // const [user, setUser] = useState([])
  // const params = useParams();

  // useEffect(() => {
  //   getUser()
  // }, []);

  // const getUser = () => {
  //   axios
  //     .get(`https://jsonplaceholder.typicode.com/users/${params.userId}`)
  //     .then((response) => setUser(response.data))
  // }

  return (
    <>
      <div>Users</div>
      <Outlet />
    </>
  );
}

export default User;
