'use client';

import React from 'react';
import { Pokemon } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center space-y-4 border border-gray-200">
      <h1 className="text-xl font-bold capitalize">{pokemon.name}</h1>
      
      {/* Menampilkan gambar jika ada */}
      {pokemon.sprites?.front_default ? (
        <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-32 h-32 object-contain"/>
      ) : (
        <div className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded-md">
          <span className="text-gray-500 text-sm">No Image</span>
        </div>
      )}

      {/* Menampilkan tipe Pokemon */}
      <div className="flex gap-2">
        {pokemon.types.map((type, index) => (
          <span 
            key={index} 
            className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full capitalize">
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
