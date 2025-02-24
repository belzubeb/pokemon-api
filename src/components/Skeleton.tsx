import React from 'react';

const Skeleton = () => {
  return (
    <div className="bg-gray-200 animate-pulse rounded-xl p-4 border border-gray-300 h-32">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded w-full mt-2"></div>
    </div>
  );
};

export default Skeleton;
