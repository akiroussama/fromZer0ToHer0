import './Login.css';
import React from 'react';
import { useState } from 'react';
export default function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');


   const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Email:",email)
        console.log("Password:", password);
        // appeler l'API pour se connecter
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type='email' name='email' onChange={(e)=> setEmail(e.target.value)}/>
        </label>

        <label>
          Password
          <input type='password' name='password' onChange={(e)=> setPassword(e.target.value)}/>
        </label>

        <button type='submit'>Login</button>
      </form>
    </>
  );
}
