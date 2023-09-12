import { useEffect, useState } from "react";
import { cachedPokemon, listResponse, pokemonResponse } from "./pokemon";
import { PokemonCard } from "./components/PokemonCard";

function App() {
  const [pokemonUrls, setPokemonUrls] = useState<string[]>([]);
  const [activePokemon, setActivePokemon] = useState<cachedPokemon[]>(
    new Array(20)
  );

  // Get the initial list of urls for all pokemon
  useEffect(() => {
    async function getPokemon() {
      const listResponse = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=2000"
      );
      const listData: listResponse = await listResponse.json();
      // Get list of urls for each available pokemon
      const urls = listData.results.map((endpoint) => {
        return endpoint.url;
      });

      // Choose 20 random ones to play with
      const randomPokemon: cachedPokemon[] = [];
      for (let i = 0; i < 20; i++) {
        await getRandomPokemon(urls, randomPokemon);
      }

      console.log(randomPokemon);
      setPokemonUrls(urls);
      setActivePokemon(randomPokemon);
    }

    async function getRandomPokemon(
      urls: string[],
      randomPokemon: cachedPokemon[]
    ) {
      const url = urls[Math.floor(Math.random() * urls.length)];
      const pokemonResponse = await fetch(url);
      const pokemonData: pokemonResponse = await pokemonResponse.json();
      const pokemon = {
        id: pokemonData.id,
        name: pokemonData.name,
        src: pokemonData.sprites.front_default,
        clicked: false,
      };
      if (
        pokemonData.sprites.front_default &&
        randomPokemon.every((p) => p.id !== pokemon.id)
      ) {
        randomPokemon.push(pokemon);
      } else {
        getRandomPokemon(urls, randomPokemon);
      }
    }

    getPokemon();
  }, []);

  return (
    <>
      {activePokemon.map((pokemon) => {
        return <PokemonCard {...pokemon} key={pokemon.id} />;
      })}
    </>
  );
}

export default App;
