import { gql, useMutation } from '@apollo/client';

const IS_ADMIN = gql`
    mutation adminMutation() {
        isAdmin(id: $id) {
            isAdmin
        }
    }
`;

function IsAdmin() {
  const [isAdmin, { loading, error, data }] = useMutation(IS_ADMIN);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  isAdmin();
  console.log(data);
  return <div>{data && <h1>{data.adminMutation}</h1>}</div>;
}

export default IsAdmin;
