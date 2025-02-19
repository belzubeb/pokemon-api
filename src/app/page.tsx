'use client';

import React, { useState } from 'react';
import useFetchPokemon from '../hooks/useFetchPokemon';
import PokemonCard from '../components/PokemonCard';
import SkeletonCard from '../components/SkeletonCard';
import SearchBar from '../components/SearchBar'; 

const HomePage = () => {
  const [limit, setLimit] = useState(51); 
  const [filterType, setFilterType] = useState<string>('all'); 
  const [searchTerm, setSearchTerm] = useState<string>(''); // 🔍 State pencarian
  const { pokemons, loading, error } = useFetchPokemon(filterType === 'all' ? limit : 2000);

  // 🔍 Filter berdasarkan jenis + nama
  const filteredPokemons = pokemons.filter(pokemon => 
    (filterType === 'all' || pokemon.types.some(type => type.type.name === filterType)) &&
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filter pencarian
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center">Pokedex</h1>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <div className="my-4 text-center">
        <label className="mr-2 font-semibold">Filter by Type:</label>
        <select 
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="all">All</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="ice">Ice</option>
          <option value="psychic">Psychic</option>
          <option value="fighting">Fighting</option>
          <option value="ground">Ground</option>
        </select>
      </div>

      {error && <div>{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 12 }).map((_, index) => <SkeletonCard key={index} />) // Skeleton untuk loading
          : filteredPokemons.length > 0
            ? filteredPokemons.map((pokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} />)
            : <div className="text-center col-span-full text-gray-500">No Pokémon found</div>
        }
      </div>

      {filterType === 'all' && searchTerm === '' && !loading && (
        <div className="text-center mt-6">
          <button 
            onClick={() => setLimit(prevLimit => prevLimit + 12)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
