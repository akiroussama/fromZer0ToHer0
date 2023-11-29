import { gql, useQuery } from '@apollo/client';

const GET_WILDERS = gql`
  query GetWilders {
    wilders {
        id
        name
    }
  }
`;
function Home() {
  const { loading, error, data } = useQuery(GET_WILDERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      {data.wilders.map(({ id, name }) => (
        <div key={id}>
          <h3>{name}</h3>
          <br />
          <b>Hello Wilder !</b>
          <p>{id}</p>
          <br />
        </div>
      ))}
    </div>
  );
}

export default Home;
