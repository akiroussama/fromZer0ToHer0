import React from 'react';
import { useParams } from 'react-router-dom';
const WilderDetails: React.FC = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Wilder Details</h1>
      <p>Wilder id: {id}</p>
      {/* Add your code here */}
    </div>
  );
};

export default WilderDetails;
