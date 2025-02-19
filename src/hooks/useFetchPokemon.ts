import { useState, useEffect } from 'react';
import { Pokemon } from '../types/pokemon';

const useFetchPokemon = (limit: number = 10) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        if (!res.ok) throw new Error('Failed to fetch Pokémon list');
        
        const { results } = await res.json();
        const pokemonDetails: Pokemon[] = await Promise.all(
          results.map(async (pokemon: { url: string }) => {
            const response = await fetch(pokemon.url);
            return response.json();
          })
        );

        setPokemons(pokemonDetails);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch Pokémon data');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, [limit]);

  return { pokemons, loading, error };
};

export default useFetchPokemon;
