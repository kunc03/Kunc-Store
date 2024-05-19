import React from 'react';
import { ClipLoader, PacmanLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-[75vh]">
      <ClipLoader color="#2563eb" size={50} />
    </div>
  );
};

export default Loading;
