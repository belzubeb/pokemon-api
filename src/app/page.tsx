'use client';

import React from 'react';
import useFetchPokemon from '../hooks/useFetchPokemon';
import PokemonCard from '../components/PokemonCard';

const HomePage = () => {
  const { pokemons, loading, error } = useFetchPokemon(12); // Fetch 12 Pokémon

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default HomePage;
