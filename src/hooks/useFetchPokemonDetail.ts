import { useState, useEffect } from 'react';
import { Pokemon } from '../types/pokemon';

const useFetchPokemonDetail = (id: string | string[] | undefined) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPokemonDetail = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) throw new Error(`Failed to fetch Pokémon with id ${id}`);

        const data = await res.json();
        setPokemon({
          id: data.id,
          name: data.name,
          height: data.height,
          weight: data.weight,
          sprites: data.sprites,
          types: data.types,
          stats: data.stats,
        });
      } catch (error) {
        console.error(error);
        setError('Failed to fetch Pokémon data');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [id]);

  return { pokemon, loading, error };
};

export default useFetchPokemonDetail;
