export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonSprites {
  front_default: string;
  front_shiny?: string;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number; // Ditambahkan
  weight: number; // Ditambahkan
  sprites: PokemonSprites;
  types: PokemonType[];
  stats: PokemonStat[]; // Ditambahkan
}
