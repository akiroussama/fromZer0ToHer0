import React, { useState } from 'react';
import './Login.css';

import { useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { gql } from '@apollo/client';
// const LOGIN = gql`
//    mutation LOGIN($data: UserInput!) {
//             login(data: $data) {
//                 token
//             }
//         }
// `;
import AuthService from '../graphql/queries/Login';
const LOGIN = gql`
  query LOGIN($password: String!, $email: String!) {
    login(password: $password, email: $email)
  }
`;
export default function Login() {
  const [email, setEmail] = useState('akir@yellow.fr');
  const [password, setPassword] = useState('Yellow2023*');

  const [seConnecter, { data, error }] = useLazyQuery(LOGIN, {
    variables: { email, password },
  });
  let navigate = useNavigate();
  if (data) {
    console.log('data from query', data.login);
    if (data.login === null || data.login === undefined)
      return console.log('error from query', error);
    else localStorage.setItem('token', data.login);
    navigate('/');
  }
  if (error) {
    console.log('error from query', error);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    // Add your login logic here
    seConnecter();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>
          Email
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor='password'>
          Password
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <p className='error-message'> {error.message} </p>}
        <button type='submit'>Login</button>
      </form>
    </>
  );
}
