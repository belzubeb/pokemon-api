'use client';

import React from 'react';
import Link from 'next/link';
import { Pokemon } from '../types/pokemon';
import { POKEMON_TYPE_COLORS } from "@/styles/colors";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <Link href={`/pokemon/${pokemon.id}`} className="cursor-pointer">
      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center space-y-4 border border-gray-200 hover:scale-105 transition-transform">
        <h1 className="text-xl font-bold capitalize">{pokemon.name}</h1>

        {pokemon.sprites?.front_default ? (
          <img
            src={pokemon.sprites.front_default}
            alt={`Image of ${pokemon.name}`}
            className="w-32 h-32 object-contain"
          />
        ) : (
          <div className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded-md">
            <span className="text-gray-500 text-sm">No Image</span>
          </div>
        )}

        <div className="flex gap-2">
          {pokemon.types.map((type, index) => (
            <span
            key={index}
            className={`text-white text-sm px-3 py-1 rounded-full capitalize ${POKEMON_TYPE_COLORS[type.type.name] || 'bg-gray-500'}`}>
            {type.type.name}
          </span>
          ))}
        </div>
      </div>
    </Link>
  );
};


export default PokemonCard;
