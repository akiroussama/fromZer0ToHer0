// Import everything needed to use the `useQuery` hook
import { useQuery, gql } from '@apollo/client';
import React from 'react';

const GET_ALL_WILDERS = gql`
query GetAllWilders {
  wilders {
    id
    name
  }
}
`;
export default function App() {
  const { loading, error, data } = useQuery(GET_ALL_WILDERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  // return list of wilders:
  return (
    <div>
      {data.wilders.map((wilder: any) => (
        <p key={wilder.id}>{wilder.name}</p>
      ))}
    </div>
  );
}
