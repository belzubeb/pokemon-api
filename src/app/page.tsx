'use client'

import React, { useState } from 'react';
import useFetchPokemon from '../hooks/useFetchPokemon';
import PokemonCard from '../components/PokemonCard';
import SkeletonCard from '../components/SkeletonCard';
import SearchBar from '../components/SearchBar';
import FilterType from '../components/FilterType';
import Link from 'next/link';

const HomePage = () => {
  const [limit, setLimit] = useState(51);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { pokemons, loading, error } = useFetchPokemon(filterType === 'all' ? limit : 2000);

  const filteredPokemons = pokemons.filter(pokemon =>
    (filterType === 'all' || pokemon.types.some(type => type.type.name === filterType)) &&
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center">Pokédex</h1>

      <div className="text-center my-4">
        <Link href="/objects">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 transition">
            Go to Objects Page
          </button>
        </Link>
      </div>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <FilterType filterType={filterType} onFilterChange={setFilterType} />

      {error && <div>{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 12 }).map((_, index) => <SkeletonCard key={index} />)
          : filteredPokemons.length > 0
          ? filteredPokemons.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />)
          : <div className="text-center col-span-full text-gray-500">No Pokémon found</div>
        }
      </div>

      {filterType === 'all' && searchTerm === '' && !loading && (
        <div className="text-center mt-6">
          <button
            onClick={() => setLimit(prevLimit => prevLimit + 12)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
