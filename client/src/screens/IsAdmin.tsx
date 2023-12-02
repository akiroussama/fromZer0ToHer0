import React from 'react';
import { useQuery, gql } from '@apollo/client';

const TEST_AUTH = gql`
query Query {
  authedQuery
}
`;
function IsAdmin() {
  // call usemutation
  const { data, loading, error } = useQuery(TEST_AUTH);
  // call mutation once
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log('data', data);
  return (
    <div>
      {
        <>
          <br />
          <b> IS AUTHORIZED !</b>
          {data && <h3>{data.authedQuery}</h3>}
          <br />
        </>
      }
    </div>
  );
}

export default IsAdmin;
