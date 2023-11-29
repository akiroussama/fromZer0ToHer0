import { useParams } from 'react-router-dom';
const WilderDetails = () => {
  const { id } = useParams();
  return (
    <>
      <h1> Wilders Details page</h1>
      <p> Wilder id: {id}</p>
    </>
  );
};

export default WilderDetails;
