import './Login.css';
import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useLazyQuery } from '@apollo/client';
const IS_USER_EXIST_QUERY = gql`
    query IsUserExist($email: String!) {
        isUserExist(email: $email)
    }
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignin, setIsSignin] = useState('');
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(true);
  const [isUserExist, { data, error }] = useLazyQuery(IS_USER_EXIST_QUERY, {
    variables: { email },
  });
  if (data && isSignin === '') {
    console.log('data from query', data.isUserExist);
    setIsSignin(data.isUserExist);
    debugger;
  }
  if (error) {
    console.log('error from query', error);
  }
  const handleIsUserExistSubmit = (event) => {
    event.preventDefault();
    // Call GraphQL API to create new password
    isUserExist();
  };
  const handleEmailSubmit = (event) => {
    event.preventDefault();
    // Call GraphQL API to verify if user exists
    // const userExists = true; // Replace with actual API call
    const userExists = data?.isUserExist || false;
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    // Call GraphQL API to create new password
    const passwordCreated = true; // Replace with actual API call
    if (passwordCreated) {
      // Redirect to login page
    }
  };

  return (
    <>
      {isSignin === '' ? (
        <form onSubmit={handleIsUserExistSubmit}>
          <label>
            Email
            <input
              type='email'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button type='submit'>Sinup /Singin</button>
        </form>
      ) : (
        <form onSubmit={setIsSignin ? handlePasswordSubmit : handleEmailSubmit}>
          {isSignin === true ? (
            <>
              <label>
                Password
                <input
                  type='password'
                  name='password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <button type='submit'>Login</button>
            </>
          ) : (
            <>
              <label>
                New Password
                <input
                  type='password'
                  name='newPassword'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <label>
                Confirm Password
                <input
                  type='password'
                  name='confirmPassword'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <button type='submit'>Signup</button>
            </>
          )}
        </form>
      )}
    </>
  );
}
