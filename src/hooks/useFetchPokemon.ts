// src/hooks/useFetchPokemon.ts
import { useState, useEffect } from 'react';
import { Pokemon } from '../types/pokemon';

const useFetchPokemon = (url: string) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await res.json();
        setPokemon(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [url]);

  return { pokemon, loading, error };
};

export default useFetchPokemon;
