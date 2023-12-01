import React from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';

const TEST_AUTH = gql`
  mutation Mutation {
  adminMutation
}
`;
function AdminTest() {
  // call usemutation
  const [testAuth, { data, loading, error }] = useMutation(TEST_AUTH);
  // call mutation once
  React.useEffect(() => {
    testAuth();
  }, [testAuth]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log('data', data);
  return (
    <div>
      {
        <>
          <br />
          <b>Authentification succeeded !</b>
          {data && <h3>{data.adminMutation}</h3>}
          <br />
        </>
      }
    </div>
  );
}

export default AdminTest;
