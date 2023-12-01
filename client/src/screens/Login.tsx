import React, { useState } from 'react';
import './Login.css';

import { useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import AuthService from '../graphql/queries/Login';
export default function Login() {
  const [email, setEmail] = useState('akir@yellow.fr');
  const [password, setPassword] = useState('Yellow2023*');

  const [seConnecter, { data, error }] = useLazyQuery(AuthService.LOGIN, {
    variables: {
      data: {
        email,
        password,
      },
    },
  });
  let navigate = useNavigate();
  if (data) {
    console.log('data from query', data.login);
    if (data.login === null)
      return console.log('Email ou mot de passe incorrect');
    if (data.login === undefined) return console.log('undefined token');
    localStorage.setItem('token', data.login);
    navigate('/wilders/1');
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
