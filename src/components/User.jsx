import '../styles/User.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';

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

  // return (
  //   <>
  //     <Header />
  //     <h2>Пользователь</h2>
  //     <div className='user'>
  //       <div>Name: {user.name}</div>
  //       <div>Username: {user.username}</div>
  //       <div>Email: {user.email}</div>
  //     </div>
  //   </>
  // );

  return (
    <>
      <div>User</div>
    </>
  )
}

export default User;
