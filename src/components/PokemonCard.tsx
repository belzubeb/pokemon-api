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

      {pokemon.sprites?.front_default ? (
        <img src={pokemon.sprites.front_default}alt={`Image of ${pokemon.name}`}className="w-32 h-32 object-contain"/>
      ) : (
        <div className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded-md">
          <span className="text-gray-500 text-sm">No Image</span>
        </div>
      )}

      {/* Menampilkan tipe Pokémon */}
      <div className="flex gap-2">
        {pokemon.types.map((type, index) => (
          <span
            key={index}
            className={`text-white text-sm px-3 py-1 rounded-full capitalize ${getTypeColor(type.type.name)}`}
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    grass: 'bg-green-500',
    electric: 'bg-yellow-500',
    psychic: 'bg-purple-500',
    ice: 'bg-cyan-400',
    fighting: 'bg-orange-700',
    poison: 'bg-purple-600',
    ground: 'bg-yellow-700',
    flying: 'bg-indigo-400',
    bug: 'bg-lime-600',
    rock: 'bg-gray-600',
    ghost: 'bg-indigo-700',
    dragon: 'bg-indigo-800',
    dark: 'bg-gray-900',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-400',
    normal: 'bg-gray-400',
  };
  return colors[type] || 'bg-gray-500';
};

export default PokemonCard;
