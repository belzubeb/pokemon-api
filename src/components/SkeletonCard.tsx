import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="relative bg-gray-100 animate-pulse shadow-xl rounded-2xl p-6 flex flex-col items-center space-y-5 border border-gray-200">
      <div className="h-6 w-36 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md"></div>

      <div className="h-28 w-28 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full"></div>

      <div className="flex gap-3 mt-2">
        <div className="h-6 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full"></div>
        <div className="h-6 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full"></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-200 rounded-2xl opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
    </div>
  );
};

export default SkeletonCard;
