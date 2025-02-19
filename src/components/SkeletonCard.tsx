import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-gray-200 animate-pulse shadow-lg rounded-xl p-6 flex flex-col items-center space-y-4 border border-gray-300">
      {/* Nama Pokémon */}
      <div className="h-6 w-32 bg-gray-300 rounded-md"></div>

      {/* Gambar Pokémon */}
      <div className="h-24 w-24 bg-gray-300 rounded-full"></div>

      {/* Jenis Pokémon */}
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
        <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
