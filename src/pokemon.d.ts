interface cachedPokemon {
  id: number;
  name: string;
  src: string | null;
  clicked: boolean;
}

interface listResponse {
  count: number;
  previous: string;
  next: string;
  results: pokeEndpoint[];
}

interface pokemonResponse {
  id: number;
  name: string;
  sprites: { front_default: string | null; back_default: string | null };
}

interface pokeEndpoint {
  name: string;
  url: string;
}

export { cachedPokemon, listResponse, pokemonResponse, pokeEndpoint };
