import { useState, useEffect } from 'react';
import { Pokemon } from '../types/pokemon';

const useFetchPokemon = (limit: number) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        if (!res.ok) throw new Error('Failed to fetch Pokémon list');

        const { results } = await res.json();
        const pokemonDetails: Pokemon[] = await Promise.all(
          results.map(async (pokemon: { url: string }) => {
            const response = await fetch(pokemon.url);
            if (!response.ok) throw new Error(`Failed to fetch ${pokemon.url}`);
            const data = await response.json();

            return {
              id: data.id,
              name: data.name,
              height: data.height, 
              weight: data.weight, 
              sprites: data.sprites,
              types: data.types,
              stats: data.stats, 
            };
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
