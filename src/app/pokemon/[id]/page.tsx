"use client";

import { useParams } from "next/navigation";
import useFetchPokemonDetail from "@/hooks/useFetchPokemonDetail";
import { POKEMON_TYPE_COLORS } from "@/styles/colors";

const PokemonDetail = () => {
  const { id } = useParams();
  const { pokemon, loading, error } = useFetchPokemonDetail(id);

  if (loading)
    return <p className="text-center text-xl font-semibold animate-pulse">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-2xl rounded-2xl border border-gray-200">
      {/* Nama Pokémon */}
      <h1 className="text-5xl font-bold capitalize text-center text-gray-800 drop-shadow-md">
        {pokemon?.name}
      </h1>

      {/* Gambar Pokémon */}
      <div className="flex justify-center my-8">
        {pokemon?.sprites?.front_default && (
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-48 h-48 object-contain transition-transform duration-300 hover:scale-110 drop-shadow-lg"
          />
        )}
      </div>

      {/* Berat & Tinggi */}
      <div className="flex justify-center gap-6 text-lg font-medium text-gray-700">
        <p>⚖️ <span className="font-bold">{pokemon?.weight ? `${pokemon.weight / 10} kg` : "N/A"}</span></p>
        <p>📏 <span className="font-bold">{pokemon?.height ? `${pokemon.height / 10} m` : "N/A"}</span></p>
      </div>

      {/* Tipe Pokémon */}
      <div className="flex justify-center gap-3 mt-6">
        {pokemon?.types?.map((type, index) => (
          <span
            key={index}
            className={`text-white px-4 py-2 rounded-full capitalize font-semibold text-lg shadow-md ${
              POKEMON_TYPE_COLORS[type.type.name] || "bg-gray-500"
            }`}
          >
            {type.type.name}
          </span>
        ))}
      </div>

      {/* Statistik Pokémon */}
      <div className="mt-8">
        <h2 className="text-3xl font-semibold text-center mb-4 text-gray-800">Stats</h2>
        <div className="space-y-3">
          {pokemon?.stats?.map((stat, index) => (
            <div key={index} className="flex items-center">
              <span className="w-32 capitalize font-medium text-gray-700">{stat.stat.name}:</span>
              <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                  style={{ width: `${Math.min(stat.base_stat, 100)}%` }}
                ></div>
              </div>
              <span className="ml-3 font-semibold text-gray-800">{stat.base_stat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
