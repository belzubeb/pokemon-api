// src/app/page.tsx
'use client';  // Menandakan bahwa ini adalah Client Component

import React from 'react';
import useFetchPokemon from '../hooks/useFetchPokemon';
import PokemonCard from '../components/PokemonCard';

const HomePage = () => {
  const { pokemon, loading, error } = useFetchPokemon('https://pokeapi.co/api/v2/pokemon/ditto');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {pokemon && <PokemonCard pokemon={pokemon} />}
    </div>
  );
};

export default HomePage;
