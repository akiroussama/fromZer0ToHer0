import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
const GET_WILDERS_BY_ID = gql`
    query GetWilderById($getWilderByIdId: Int!) {
    getWilderById(id: $getWilderByIdId) {
        id
        name
    }
    }
`;
const WilderDetails: React.FC = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_WILDERS_BY_ID, {
    variables: { getWilderByIdId: parseInt(id) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      {
        <div key={data.getWilderById.id}>
          <h3>{data.getWilderById.name}</h3>
          <br />
          <b>Hello Wilder !</b>
          <p>{data.getWilderById.id}</p>
          <br />
        </div>
      }
    </div>
  );
};

export default WilderDetails;
