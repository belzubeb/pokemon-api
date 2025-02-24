'use client'

import React from "react";

const POKEMON_TYPES = [
  { name: "all", color: "bg-gray-400" },
  { name: "fire", color: "bg-red-500" },
  { name: "water", color: "bg-blue-500" },
  { name: "grass", color: "bg-green-500" },
  { name: "electric", color: "bg-yellow-400" },
  { name: "ice", color: "bg-cyan-400" },
  { name: "psychic", color: "bg-pink-500" },
  { name: "fighting", color: "bg-orange-500" },
  { name: "ground", color: "bg-yellow-700" },
];

interface FilterTypeProps {
  filterType: string;
  onFilterChange: (value: string) => void;
}

const FilterType: React.FC<FilterTypeProps> = ({ filterType, onFilterChange }) => {
  return (
    <div className="my-4 text-center">
      <h2 className="text-lg font-semibold mb-3">Filter by Type:</h2>

      <div className="flex flex-wrap justify-center gap-2 overflow-x-auto p-2">
        {POKEMON_TYPES.map(({ name, color }) => (
          <button
            key={name}
            onClick={() => onFilterChange(name)}
            className={`px-4 py-2 rounded-full text-white font-medium transition-all 
                        ${color} 
                        ${filterType === name ? "scale-110 shadow-lg" : "opacity-80 hover:opacity-100"}`}
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterType;
